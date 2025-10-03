module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        lobster: ["Lobster_400Regular"],
        "lobster-two": ["LobsterTwo_400Regular"],
        "lobster-two-italic": ["LobsterTwo_400Regular_Italic"],
        "lobster-two-bold": ["LobsterTwo_700Bold"],
        "lobster-two-bold-italic": ["LobsterTwo_700Bold_Italic"],
        suse: ["SUSEMono_400Regular"],
      },
    },
  },
  plugins: [],
};
