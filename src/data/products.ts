export const PRODUCT_CATEGORIES = [
  "Audio",
  "Accessories",
  "Computing",
  "Gaming",
  "Mobile",
  "Networking",
  "Smart Home",
  "Storage",
  "Video",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  features: readonly string[];
  specifications: Readonly<Record<string, string>>;
  initialInventory: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  image: ProductImage;
};

type ProductFixture = Omit<Product, "image">;

const PRODUCT_FIXTURES = [
  {
    id: "headphones-01",
    sku: "AM-AUD-001",
    name: "Studio Wireless Headphones",
    category: "Audio",
    price: 129,
    description:
      "Balanced over-ear headphones with adaptive noise cancellation and a comfortable fit for long work sessions.",
    features: ["Adaptive noise cancellation", "Multipoint Bluetooth", "Fold-flat design"],
    specifications: { Battery: "30 hours", Connectivity: "Bluetooth 5.3, USB-C", Weight: "254 g" },
    initialInventory: 14,
    rating: 4.7,
    reviewCount: 286,
    featured: true,
  },
  {
    id: "keyboard-01",
    sku: "AM-ACC-001",
    name: "Mechanical Work Keyboard",
    category: "Accessories",
    price: 89,
    description:
      "A compact mechanical keyboard with tactile switches, quiet stabilizers, and a durable aluminum top plate.",
    features: ["Hot-swappable switches", "White backlight", "Mac and Windows layouts"],
    specifications: { Layout: "75%", Connection: "USB-C", Switches: "Tactile" },
    initialInventory: 8,
    rating: 4.6,
    reviewCount: 194,
    featured: true,
  },
  {
    id: "webcam-01",
    sku: "AM-VID-001",
    name: "4K Conference Webcam",
    category: "Video",
    price: 149,
    description:
      "A sharp 4K webcam with automatic framing and clear dual microphones for calls, classes, and streams.",
    features: ["Automatic framing", "Dual beamforming microphones", "Privacy shutter"],
    specifications: { Resolution: "4K at 30 fps", FieldOfView: "90 degrees", Connection: "USB-C" },
    initialInventory: 5,
    rating: 4.5,
    reviewCount: 132,
    featured: true,
  },
  {
    id: "microphone-01",
    sku: "AM-AUD-002",
    name: "Desktop USB Microphone",
    category: "Audio",
    price: 99,
    description:
      "A cardioid USB microphone tuned for natural speech with one-touch mute and direct headphone monitoring.",
    features: ["Tap-to-mute control", "Zero-latency monitoring", "Adjustable desk stand"],
    specifications: { Pattern: "Cardioid", SampleRate: "24-bit / 96 kHz", Connection: "USB-C" },
    initialInventory: 11,
    rating: 4.8,
    reviewCount: 348,
    featured: true,
  },
  {
    id: "earbuds-01",
    sku: "AM-AUD-003",
    name: "Everyday Noise-Canceling Earbuds",
    category: "Audio",
    price: 79,
    description:
      "Pocketable wireless earbuds with active noise cancellation, transparency mode, and a compact charging case.",
    features: ["Active noise cancellation", "Transparency mode", "Sweat resistant"],
    specifications: { Battery: "8 hours, 28 with case", Connectivity: "Bluetooth 5.3", Rating: "IPX4" },
    initialInventory: 22,
    rating: 4.4,
    reviewCount: 421,
    featured: false,
  },
  {
    id: "speaker-01",
    sku: "AM-AUD-004",
    name: "Portable Room Speaker",
    category: "Audio",
    price: 119,
    description:
      "A compact wireless speaker with room-filling sound, dependable battery life, and a water-resistant shell.",
    features: ["360-degree sound", "Stereo pairing", "Built-in speakerphone"],
    specifications: { Battery: "16 hours", Connectivity: "Bluetooth 5.2", Rating: "IP67" },
    initialInventory: 13,
    rating: 4.6,
    reviewCount: 239,
    featured: false,
  },
  {
    id: "audio-interface-01",
    sku: "AM-AUD-005",
    name: "Creator Audio Interface",
    category: "Audio",
    price: 159,
    description:
      "A two-input desktop audio interface for recording microphones and instruments with clean, low-noise preamps.",
    features: ["Two combo inputs", "Direct monitoring", "Loopback mode"],
    specifications: { Inputs: "2 XLR/TRS", Outputs: "2 balanced TRS", SampleRate: "24-bit / 192 kHz" },
    initialInventory: 7,
    rating: 4.7,
    reviewCount: 118,
    featured: false,
  },
  {
    id: "mouse-01",
    sku: "AM-ACC-002",
    name: "Precision Wireless Mouse",
    category: "Accessories",
    price: 69,
    description:
      "An ergonomic wireless mouse with a precise sensor, quiet switches, and rapid switching between three devices.",
    features: ["Three-device pairing", "Silent clicks", "Magnetic scroll wheel"],
    specifications: { Sensor: "8,000 DPI", Connectivity: "Bluetooth and 2.4 GHz", Battery: "70 days" },
    initialInventory: 18,
    rating: 4.7,
    reviewCount: 512,
    featured: false,
  },
  {
    id: "dock-01",
    sku: "AM-ACC-003",
    name: "Twelve-Port USB-C Dock",
    category: "Accessories",
    price: 139,
    description:
      "A compact desktop dock that adds displays, networking, card readers, and high-speed ports through one cable.",
    features: ["Dual display output", "Gigabit Ethernet", "100 W power delivery"],
    specifications: { Ports: "12", Display: "HDMI 2.0 and DisplayPort 1.4", DataSpeed: "10 Gbps" },
    initialInventory: 9,
    rating: 4.5,
    reviewCount: 176,
    featured: false,
  },
  {
    id: "charger-01",
    sku: "AM-ACC-004",
    name: "Compact 100W GaN Charger",
    category: "Accessories",
    price: 59,
    description:
      "A travel-friendly charger that powers a laptop, phone, and accessories from three compact ports.",
    features: ["Gallium nitride design", "Dynamic power sharing", "Foldable plug"],
    specifications: { TotalOutput: "100 W", Ports: "2 USB-C, 1 USB-A", Input: "100-240 V" },
    initialInventory: 26,
    rating: 4.6,
    reviewCount: 307,
    featured: false,
  },
  {
    id: "desk-mat-01",
    sku: "AM-ACC-005",
    name: "Recycled Felt Desk Mat",
    category: "Accessories",
    price: 35,
    description:
      "A soft, low-profile desk mat that protects work surfaces while keeping keyboards and mice comfortably positioned.",
    features: ["Recycled felt", "Non-slip backing", "Cable pass-through"],
    specifications: { Size: "90 x 40 cm", Thickness: "4 mm", Material: "Recycled PET felt" },
    initialInventory: 31,
    rating: 4.3,
    reviewCount: 89,
    featured: false,
  },
  {
    id: "laptop-stand-01",
    sku: "AM-ACC-006",
    name: "Adjustable Aluminum Laptop Stand",
    category: "Accessories",
    price: 49,
    description:
      "A stable aluminum stand that raises a laptop to eye level and folds flat when the workday is done.",
    features: ["Six height positions", "Ventilated platform", "Folds for travel"],
    specifications: { Compatibility: "11-17 inch laptops", Material: "Anodized aluminum", Capacity: "8 kg" },
    initialInventory: 17,
    rating: 4.5,
    reviewCount: 214,
    featured: false,
  },
  {
    id: "mini-pc-01",
    sku: "AM-CMP-001",
    name: "Compact Creator PC",
    category: "Computing",
    price: 699,
    description:
      "A quiet mini desktop with enough performance for everyday development, design, and light media production.",
    features: ["Tool-free memory access", "Dual 4K display support", "Quiet cooling"],
    specifications: { Processor: "8-core", Memory: "16 GB", Storage: "1 TB NVMe SSD" },
    initialInventory: 4,
    rating: 4.6,
    reviewCount: 73,
    featured: false,
  },
  {
    id: "monitor-01",
    sku: "AM-CMP-002",
    name: "27-Inch 4K Productivity Monitor",
    category: "Computing",
    price: 329,
    description:
      "A color-accurate 4K display with a height-adjustable stand and one-cable USB-C connectivity.",
    features: ["Factory-calibrated color", "USB-C hub", "Low blue light mode"],
    specifications: { Panel: "27-inch IPS", Resolution: "3840 x 2160", PowerDelivery: "90 W USB-C" },
    initialInventory: 6,
    rating: 4.7,
    reviewCount: 158,
    featured: false,
  },
  {
    id: "portable-monitor-01",
    sku: "AM-CMP-003",
    name: "15-Inch Portable Display",
    category: "Computing",
    price: 199,
    description:
      "A slim second screen for mobile workstations with a matte panel and a protective folding cover.",
    features: ["Single-cable video and power", "Integrated kickstand", "Portrait support"],
    specifications: { Panel: "15.6-inch IPS", Resolution: "1920 x 1080", Brightness: "300 nits" },
    initialInventory: 10,
    rating: 4.4,
    reviewCount: 96,
    featured: false,
  },
  {
    id: "controller-01",
    sku: "AM-GAM-001",
    name: "Cross-Platform Wireless Controller",
    category: "Gaming",
    price: 64,
    description:
      "A responsive wireless controller with textured grips, remappable controls, and broad platform support.",
    features: ["Hall-effect sticks", "Two rear buttons", "Adjustable trigger travel"],
    specifications: { Compatibility: "PC, mobile, and console", Battery: "24 hours", Weight: "286 g" },
    initialInventory: 19,
    rating: 4.6,
    reviewCount: 275,
    featured: false,
  },
  {
    id: "gaming-headset-01",
    sku: "AM-GAM-002",
    name: "Low-Latency Gaming Headset",
    category: "Gaming",
    price: 109,
    description:
      "A lightweight wireless headset with low-latency audio and a detachable broadcast-style microphone.",
    features: ["Spatial audio", "Detachable microphone", "Simultaneous Bluetooth"],
    specifications: { Battery: "38 hours", Drivers: "50 mm", Weight: "298 g" },
    initialInventory: 12,
    rating: 4.5,
    reviewCount: 187,
    featured: false,
  },
  {
    id: "capture-card-01",
    sku: "AM-GAM-003",
    name: "4K Game Capture Card",
    category: "Gaming",
    price: 169,
    description:
      "A plug-and-play capture card for recording smooth gameplay while retaining a high-resolution passthrough signal.",
    features: ["HDR passthrough", "Variable refresh support", "Instant gameview"],
    specifications: { Capture: "4K at 30 fps", Passthrough: "4K at 60 fps HDR", Connection: "USB-C 3.2" },
    initialInventory: 6,
    rating: 4.4,
    reviewCount: 105,
    featured: false,
  },
  {
    id: "phone-gimbal-01",
    sku: "AM-MOB-001",
    name: "Pocket Phone Gimbal",
    category: "Mobile",
    price: 89,
    description:
      "A foldable three-axis stabilizer that keeps mobile video smooth and tracks subjects automatically.",
    features: ["Three-axis stabilization", "Subject tracking", "Built-in extension rod"],
    specifications: { Battery: "10 hours", Payload: "170-290 g", Weight: "352 g" },
    initialInventory: 15,
    rating: 4.5,
    reviewCount: 146,
    featured: false,
  },
  {
    id: "power-bank-01",
    sku: "AM-MOB-002",
    name: "High-Capacity USB-C Power Bank",
    category: "Mobile",
    price: 74,
    description:
      "A fast-charging battery pack with enough capacity for several phone charges or a meaningful laptop boost.",
    features: ["Two-way fast charging", "Battery percentage display", "Airline-safe capacity"],
    specifications: { Capacity: "20,000 mAh", MaxOutput: "65 W", Ports: "2 USB-C, 1 USB-A" },
    initialInventory: 24,
    rating: 4.6,
    reviewCount: 333,
    featured: false,
  },
  {
    id: "wireless-charger-01",
    sku: "AM-MOB-003",
    name: "Three-in-One Wireless Charger",
    category: "Mobile",
    price: 69,
    description:
      "A weighted bedside charging stand for a phone, watch, and earbuds with tidy cable management.",
    features: ["Magnetic phone alignment", "Nightstand mode", "Foreign-object detection"],
    specifications: { PhoneOutput: "15 W", EarbudOutput: "5 W", Input: "USB-C" },
    initialInventory: 20,
    rating: 4.4,
    reviewCount: 228,
    featured: false,
  },
  {
    id: "router-01",
    sku: "AM-NET-001",
    name: "Tri-Band Mesh Wi-Fi Router",
    category: "Networking",
    price: 229,
    description:
      "A compact mesh router that delivers reliable whole-home coverage with simple setup and modern security controls.",
    features: ["Tri-band mesh", "Automatic security updates", "Guest network"],
    specifications: { Standard: "Wi-Fi 6E", Coverage: "2,500 sq ft", Ethernet: "2 x 2.5 GbE" },
    initialInventory: 8,
    rating: 4.5,
    reviewCount: 167,
    featured: false,
  },
  {
    id: "network-switch-01",
    sku: "AM-NET-002",
    name: "Eight-Port 2.5G Network Switch",
    category: "Networking",
    price: 119,
    description:
      "A fanless unmanaged switch for fast home-office transfers, media servers, and multi-gig internet connections.",
    features: ["Plug-and-play setup", "Fanless enclosure", "Traffic prioritization"],
    specifications: { Ports: "8 x 2.5 GbE", Capacity: "40 Gbps", Mounting: "Desktop or wall" },
    initialInventory: 9,
    rating: 4.6,
    reviewCount: 81,
    featured: false,
  },
  {
    id: "smart-hub-01",
    sku: "AM-HOM-001",
    name: "Matter Smart Home Hub",
    category: "Smart Home",
    price: 79,
    description:
      "A privacy-minded home hub that connects compatible lights, sensors, switches, and locks across major ecosystems.",
    features: ["Matter controller", "Thread border router", "Local automations"],
    specifications: { Protocols: "Matter, Thread, Wi-Fi", Power: "USB-C", Ethernet: "Gigabit" },
    initialInventory: 13,
    rating: 4.3,
    reviewCount: 124,
    featured: false,
  },
  {
    id: "smart-bulb-kit-01",
    sku: "AM-HOM-002",
    name: "Color Smart Bulb Starter Kit",
    category: "Smart Home",
    price: 59,
    description:
      "A four-bulb starter kit with tunable white light, vivid color scenes, schedules, and local controls.",
    features: ["Sixteen million colors", "Sunrise schedules", "No cloud account required"],
    specifications: { Quantity: "4 bulbs", Brightness: "1,100 lumens each", Base: "E26" },
    initialInventory: 21,
    rating: 4.4,
    reviewCount: 296,
    featured: false,
  },
  {
    id: "indoor-camera-01",
    sku: "AM-HOM-003",
    name: "Privacy Indoor Camera",
    category: "Smart Home",
    price: 89,
    description:
      "A compact security camera with local recording, on-device detection, and a physical privacy shutter.",
    features: ["On-device person detection", "Physical privacy shutter", "Local microSD recording"],
    specifications: { Resolution: "2K", FieldOfView: "125 degrees", Connectivity: "Dual-band Wi-Fi" },
    initialInventory: 16,
    rating: 4.5,
    reviewCount: 202,
    featured: false,
  },
  {
    id: "portable-ssd-01",
    sku: "AM-STO-001",
    name: "1TB Rugged Portable SSD",
    category: "Storage",
    price: 109,
    description:
      "A pocket-size solid-state drive with fast transfers and a durable enclosure for work away from a desk.",
    features: ["Hardware encryption", "Drop resistant", "USB-C cable included"],
    specifications: { Capacity: "1 TB", ReadSpeed: "1,050 MB/s", Durability: "IP65" },
    initialInventory: 18,
    rating: 4.8,
    reviewCount: 463,
    featured: false,
  },
  {
    id: "desktop-ssd-01",
    sku: "AM-STO-002",
    name: "2TB NVMe Desktop SSD",
    category: "Storage",
    price: 149,
    description:
      "A high-speed internal SSD for responsive workstations, game libraries, and demanding creative projects.",
    features: ["Dynamic thermal control", "Five-year warranty", "Migration software"],
    specifications: { Capacity: "2 TB", Interface: "PCIe 4.0 x4", ReadSpeed: "7,000 MB/s" },
    initialInventory: 12,
    rating: 4.8,
    reviewCount: 389,
    featured: false,
  },
  {
    id: "nas-01",
    sku: "AM-STO-003",
    name: "Two-Bay Personal Cloud Enclosure",
    category: "Storage",
    price: 249,
    description:
      "A quiet two-bay network storage enclosure for household backups, shared files, and private media libraries.",
    features: ["Tool-free drive trays", "Automatic device backup", "Private remote access"],
    specifications: { Bays: "2", Networking: "2.5 GbE", Drives: "Not included" },
    initialInventory: 5,
    rating: 4.5,
    reviewCount: 91,
    featured: false,
  },
  {
    id: "streaming-light-01",
    sku: "AM-VID-002",
    name: "Adjustable Streaming Key Light",
    category: "Video",
    price: 109,
    description:
      "A soft, edge-lit panel that delivers flicker-free desk lighting with adjustable brightness and color temperature.",
    features: ["Wireless controls", "Desk clamp mount", "Saved lighting presets"],
    specifications: { Brightness: "1,400 lumens", ColorTemperature: "2,900-7,000 K", Power: "AC adapter" },
    initialInventory: 10,
    rating: 4.6,
    reviewCount: 144,
    featured: false,
  },
  {
    id: "projector-01",
    sku: "AM-VID-003",
    name: "Portable Full HD Projector",
    category: "Video",
    price: 399,
    description:
      "A compact projector with automatic focus, integrated speakers, and a battery for flexible movie nights.",
    features: ["Automatic focus", "Automatic keystone", "Integrated stereo speakers"],
    specifications: { Resolution: "1920 x 1080", Brightness: "500 ANSI lumens", Battery: "2.5 hours" },
    initialInventory: 3,
    rating: 4.3,
    reviewCount: 68,
    featured: false,
  },
] as const satisfies readonly ProductFixture[];

export type ProductId = (typeof PRODUCT_FIXTURES)[number]["id"];

const unsplashPhoto = (photoId: string) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=1200&q=80`;

const PRODUCT_IMAGES: Record<ProductId, ProductImage> = {
  "headphones-01": {
    src: unsplashPhoto("1505740420928-5e560c06d30e"),
    alt: "Black over-ear headphones on a yellow background",
  },
  "keyboard-01": {
    src: unsplashPhoto("1587829741301-dc798b83add3"),
    alt: "Compact mechanical keyboard on a desk",
  },
  "webcam-01": {
    src: unsplashPhoto("1587826080692-f439cd0b70da"),
    alt: "Webcam mounted above a desktop display",
  },
  "microphone-01": {
    src: unsplashPhoto("1590602847861-f357a9332bbc"),
    alt: "Desktop microphone prepared for recording",
  },
  "earbuds-01": {
    src: unsplashPhoto("1590658268037-6bf12165a8df"),
    alt: "Wireless earbuds beside their charging case",
  },
  "speaker-01": {
    src: unsplashPhoto("1608043152269-423dbba4e7e1"),
    alt: "Portable wireless speaker in a home setting",
  },
  "audio-interface-01": {
    src: unsplashPhoto("1590602847861-f357a9332bbc"),
    alt: "Home recording equipment arranged on a desk",
  },
  "mouse-01": {
    src: unsplashPhoto("1527814050087-3793815479db"),
    alt: "Wireless computer mouse on a clean surface",
  },
  "dock-01": {
    src: unsplashPhoto("1675589052020-0489b8a84f09"),
    alt: "Modern laptop workstation with connected accessories",
  },
  "charger-01": {
    src: unsplashPhoto("1583863788434-e58a36330cf0"),
    alt: "Compact charging adapter and cable",
  },
  "desk-mat-01": {
    src: unsplashPhoto("1497366811353-6870744d04b2"),
    alt: "Organized modern desk with computer accessories",
  },
  "laptop-stand-01": {
    src: unsplashPhoto("1525547719571-a2d4ac8945e2"),
    alt: "Laptop raised on a minimal desk setup",
  },
  "mini-pc-01": {
    src: unsplashPhoto("1593642632823-8f785ba67e45"),
    alt: "Compact computer workspace with a desktop display",
  },
  "monitor-01": {
    src: unsplashPhoto("1527443224154-c4a3942d3acf"),
    alt: "Slim desktop monitor in a minimal workspace",
  },
  "portable-monitor-01": {
    src: unsplashPhoto("1496181133206-80ce9b88a853"),
    alt: "Portable computer display beside a laptop",
  },
  "controller-01": {
    src: unsplashPhoto("1600080972464-8e5f35f63d08"),
    alt: "Wireless game controller on a dark surface",
  },
  "gaming-headset-01": {
    src: unsplashPhoto("1505740420928-5e560c06d30e"),
    alt: "Over-ear headset ready for gaming",
  },
  "capture-card-01": {
    src: unsplashPhoto("1542751371-adc38448a05e"),
    alt: "Gaming and streaming equipment with colorful lighting",
  },
  "phone-gimbal-01": {
    src: unsplashPhoto("1511707171634-5f897ff02aa9"),
    alt: "Smartphone prepared for mobile photography",
  },
  "power-bank-01": {
    src: unsplashPhoto("1609091839311-d5365f9ff1c5"),
    alt: "Portable charging accessories beside a mobile device",
  },
  "wireless-charger-01": {
    src: unsplashPhoto("1587033411391-5d9e51cce126"),
    alt: "Smartphone resting on a wireless charging surface",
  },
  "router-01": {
    src: unsplashPhoto("1606904825846-647eb07f5be2"),
    alt: "Wireless network router with status lights",
  },
  "network-switch-01": {
    src: unsplashPhoto("1558494949-ef010cbdcc31"),
    alt: "Network equipment with connected data cables",
  },
  "smart-hub-01": {
    src: unsplashPhoto("1558002038-1055907df827"),
    alt: "Connected smart-home devices in a modern room",
  },
  "smart-bulb-kit-01": {
    src: unsplashPhoto("1507473885765-e6ed057f782c"),
    alt: "Glowing smart light bulb in a dark setting",
  },
  "indoor-camera-01": {
    src: unsplashPhoto("1557324232-b8917d3c3dcb"),
    alt: "Compact indoor security camera",
  },
  "portable-ssd-01": {
    src: unsplashPhoto("1597872200969-2b65d56bd16b"),
    alt: "Portable solid-state storage drive",
  },
  "desktop-ssd-01": {
    src: unsplashPhoto("1597872200969-2b65d56bd16b"),
    alt: "Solid-state drive and computer storage hardware",
  },
  "nas-01": {
    src: unsplashPhoto("1558494949-ef010cbdcc31"),
    alt: "Network storage equipment in a server rack",
  },
  "streaming-light-01": {
    src: unsplashPhoto("1524484485831-a92ffc0de03f"),
    alt: "Adjustable studio light illuminating a workspace",
  },
  "projector-01": {
    src: unsplashPhoto("1478720568477-152d9b164e26"),
    alt: "Projector casting a movie image in a dark room",
  },
};

export const PRODUCTS = PRODUCT_FIXTURES.map((product) => ({
  ...product,
  image: PRODUCT_IMAGES[product.id],
})) satisfies readonly Product[];

export const FEATURED_PRODUCTS = PRODUCTS.filter((product) => product.featured);

export const PRODUCTS_BY_ID: ReadonlyMap<string, Product> = new Map(
  PRODUCTS.map((product) => [product.id, product]),
);
