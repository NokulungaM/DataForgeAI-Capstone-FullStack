import path from "path";

export default {
  pageExtensions: ["js", "jsx"],
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(process.cwd(), "src");
    return config;
  },
  images: {
    domains: ["i.ytimg.com", "www.healthbenefitstimes.com", "https://th.bing.com", "images.pexels.com"], // Add i.ytimg.com to the list of allowed domains
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "",
    //   },
    // ],
  },
};
