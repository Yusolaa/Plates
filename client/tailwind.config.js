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
        alan: ["AlanSans_400Regular"],
        "alan-black": ["AlanSans_900Black"],
        "alan-medium": ["AlanSans_500Medium"],
      },
      colors: {
        wintergreen: "#8fcf99",
        "wintergreen-dark": "	#28b882 ",
        "green-gc": "#748f75",
        "green-gc-dark": "#8c9e75",
      },
    },
  },
  plugins: [],
};
