import AsyncStorage from "@react-native-async-storage/async-storage";

interface ScanActivity {
  plateText: string;
  category: string | null;
  confidence: number;
  timestamp: string;
}

interface UserStats {
  totalScans: number;
  lastScanDate: string | null;
  firstLaunchDate: string;
  scanHistory: ScanActivity[];
}

export const ActivityTracker = {
  // Get anonymous user ID
  async getUserId(): Promise<string> {
    let userId = await AsyncStorage.getItem("anonymousUserId");
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await AsyncStorage.setItem("anonymousUserId", userId);
    }
    return userId;
  },

  // Get username
  async getUsername(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem("username");
    } catch (error) {
      return null;
    }
  },

  // Update username
  async updateUsername(username: string): Promise<void> {
    try {
      await AsyncStorage.setItem("username", username);
      console.log("✅ Username updated:", username);
    } catch (error) {
      console.error("Error updating username:", error);
      throw error;
    }
  },

  // Track a plate scan
  async trackScan(
    plateText: string,
    category: string | null,
    confidence: number
  ) {
    try {
      const userId = await this.getUserId();

      const scanActivity: ScanActivity = {
        plateText,
        category,
        confidence,
        timestamp: new Date().toISOString(),
      };

      // Get existing history
      const historyJson = await AsyncStorage.getItem("scanHistory");
      const history: ScanActivity[] = historyJson
        ? JSON.parse(historyJson)
        : [];

      // Add new scan (keep last 100 scans)
      history.unshift(scanActivity);
      const limitedHistory = history.slice(0, 100);

      // Save updated history
      await AsyncStorage.setItem("scanHistory", JSON.stringify(limitedHistory));

      // Update total scans count
      const totalScans = await this.getTotalScans();
      await AsyncStorage.setItem("totalScans", (totalScans + 1).toString());

      // Update last scan date
      await AsyncStorage.setItem("lastScanDate", new Date().toISOString());

      console.log("✅ Scan tracked:", plateText);
    } catch (error) {
      console.error("Error tracking scan:", error);
    }
  },

  // Get total scans
  async getTotalScans(): Promise<number> {
    try {
      const total = await AsyncStorage.getItem("totalScans");
      return total ? parseInt(total, 10) : 0;
    } catch (error) {
      return 0;
    }
  },

  // Get scan history
  async getScanHistory(limit: number = 20): Promise<ScanActivity[]> {
    try {
      const historyJson = await AsyncStorage.getItem("scanHistory");
      const history: ScanActivity[] = historyJson
        ? JSON.parse(historyJson)
        : [];
      return history.slice(0, limit);
    } catch (error) {
      return [];
    }
  },

  // Get user statistics
  async getUserStats(): Promise<UserStats> {
    try {
      const totalScans = await this.getTotalScans();
      const lastScanDate = await AsyncStorage.getItem("lastScanDate");
      const firstLaunchDate =
        (await AsyncStorage.getItem("firstLaunchDate")) ||
        new Date().toISOString();
      const scanHistory = await this.getScanHistory(10);

      return {
        totalScans,
        lastScanDate,
        firstLaunchDate,
        scanHistory,
      };
    } catch (error) {
      console.error("Error getting stats:", error);
      return {
        totalScans: 0,
        lastScanDate: null,
        firstLaunchDate: new Date().toISOString(),
        scanHistory: [],
      };
    }
  },

  // Clear all data (for testing or reset)
  async clearAllData() {
    try {
      await AsyncStorage.multiRemove([
        "anonymousUserId",
        "scanHistory",
        "totalScans",
        "lastScanDate",
        "firstLaunchDate",
        "hasCompletedOnboarding",
      ]);
      console.log("✅ All data cleared");
    } catch (error) {
      console.error("❌ Error clearing data:", error);
    }
  },
};
