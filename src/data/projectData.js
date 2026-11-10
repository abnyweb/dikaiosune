export const companyInfo = {
  name: "Dikaiosune Pvt Ltd",
  cin: "U01111UP2022PTC174884",
  tagline: "Justice for every living soul",
  campaignLine: "Grown with justice. Taught with care.",
  email: "admin@dikaiosune.in",
  registeredOffice: "Mohari Khurd, Mohanlalganj, Lucknow, Uttar Pradesh, India",
  projectSite: "Ram Sanehi Ghat, Barabanki, Uttar Pradesh, India",
  siteSize: "~112 acres contiguous campus",
  universityAct: "Uttar Pradesh Private Universities Act (Programmes subject to approval by Veterinary Council of India & State Government)",
  currentStatus: "Phase 1 Planning & Approvals Stage",
  datesNote: "Dates and output figures are indicative planning targets from base case financial projections."
};

export const loopSteps = [
  {
    step: "01",
    id: "feed",
    title: "Our own feed mill",
    tagline: "Nutrition & Local Sourcing",
    description: "Balanced, tested feed made on site from local maize, soya and bran, for our animals and for farmers across the region.",
    inputs: "Local maize, soya meal, de-oiled rice bran, vitamins & minerals",
    outputs: "30 tonne/hr custom feed pellets & accredited mineral mixtures",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80",
    color: "#C08A2E"
  },
  {
    step: "02",
    id: "animals",
    title: "Animals raised with care",
    tagline: "Welfare-First Modern Housing",
    description: "Pigs, poultry, Gir cattle, goats and fish in modern, automated, welfare-first housing.",
    inputs: "Custom on-site feed, fresh clean water, automated temperature control",
    outputs: "High-protein eggs, pork, A2 Gir milk, fish, honey and raw manure",
    image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80",
    color: "#1E3A2B"
  },
  {
    step: "03",
    id: "biogas",
    title: "Manure into energy",
    tagline: "Clean Energy Generation",
    description: "A biogas plant turns manure into clean gas for the site and compressed biogas for sale.",
    inputs: "Daily manure slurry from cattle, swine, and poultry sheds",
    outputs: "4.8 tonnes/day CBG (Compressed Biogas) & thermal power",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=800&q=80",
    color: "#6E8F64"
  },
  {
    step: "04",
    id: "digestate",
    title: "Digestate into soil",
    tagline: "Solid-Liquid Separation",
    description: "The leftover slurry is separated into organic fertiliser and recycled water.",
    inputs: "Digested biogas effluent slurry",
    outputs: "10,000 tonnes/year certified organic manure & treated water",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80",
    color: "#A9BFA0"
  },
  {
    step: "05",
    id: "crops",
    title: "Crops, fodder and flowers",
    tagline: "Closing the Circle",
    description: "Fertiliser and water return to fodder fields, flower gardens and bee pastures, and the cycle begins again.",
    inputs: "Recycled organic fertiliser, treated irrigation water, solar energy",
    outputs: "Nutritious animal fodder, honey, botanical extracts, seed stock",
    image: "https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&w=800&q=80",
    color: "#E2C27D"
  }
];

export const farmUnits = [
  {
    id: "feed-mill",
    title: "Feed manufacturing",
    category: "core",
    categoryLabel: "Core business",
    target: "Branded feed and mineral mixture",
    description: "An automated, lab-controlled feed mill for pigs, poultry and cattle, supplying our own farm first and then dealers and farmers across India.",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "pig-farm",
    title: "Pig farm",
    category: "core",
    categoryLabel: "Core business",
    target: "Target: 500 pigs a month",
    description: "Breeding, nursery and finishing houses with high-health genetics, an on-site semen station and strict biosecurity. Builds on our existing pig farm in Lucknow.",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "layer-eggs",
    title: "Layer eggs",
    category: "core",
    categoryLabel: "Core business",
    target: "Automated, graded, traceable",
    description: "Climate-controlled layer houses with automatic feeding, collection and egg grading, packed for retail and institutional buyers.",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "broiler-poultry",
    title: "Broiler poultry",
    category: "farm",
    categoryLabel: "Farm unit",
    target: "Target: 2,500 birds a week",
    description: "Tunnel-ventilated broiler houses that also serve as a teaching unit for poultry science students.",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gir-dairy",
    title: "Gir cow dairy & ghee",
    category: "farm",
    categoryLabel: "Farm unit",
    target: "Target: 5,000 L milk a day",
    description: "An indigenous Gir herd with a ghee room built to export standard, and a teaching base for dairy science.",
    image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "aquaculture-ras",
    title: "Fish (RAS)",
    category: "farm",
    categoryLabel: "Farm unit",
    target: "Target: 10,000 fish a month",
    description: "Recirculating aquaculture tanks that reuse water and give students hands-on fisheries training.",
    image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "goats",
    title: "Goats",
    category: "research",
    categoryLabel: "Research unit",
    target: "Target: 100 goats a month",
    description: "A small-ruminant unit for breeding studies, nutrition trials and farmer demonstrations.",
    image: "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "bees-flowers",
    title: "Bees & flowers",
    category: "research",
    categoryLabel: "Research unit",
    target: "50 colonies · ~20% of land in bloom",
    description: "Flower gardens fed by our own organic fertiliser, with apiaries for honey, pollination and research.",
    image: "https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "biogas-plant",
    title: "Biogas & organic fertiliser",
    category: "loop",
    categoryLabel: "Loop unit",
    target: "Manure in, energy and soil out",
    description: "Compressed biogas for sale and site use, plus certified organic fertiliser for our fields and for farmers.",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=800&q=80"
  }
];

export const universityPrograms = [
  {
    code: "BVSC-AH",
    level: "Undergraduate",
    title: "BVSc & AH",
    summary: "The five-and-a-half-year veterinary degree, with clinical rotations in our teaching hospital and on the farm units.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
  },
  {
    code: "MVSC-PHD",
    level: "Postgraduate",
    title: "MVSc & PhD",
    summary: "Research degrees in animal nutrition, genetics, reproduction, pathology and public health, built on our specialised labs.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80"
  },
  {
    code: "AGRI-BIZ",
    level: "Professional",
    title: "Agribusiness & marketing",
    summary: "Programmes in livestock business, feed and food marketing, export and supply chains, taught alongside the farm's own operations.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
  },
  {
    code: "SKILLS",
    level: "Skills school",
    title: "Farmer & technician courses",
    summary: "Short courses in animal husbandry, AI technique, feed handling and biosecurity for farmers, entrepreneurs and farm staff.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
  }
];

export const specialisedLabs = [
  { number: "01", name: "Feed & Nutrition Analysis", desc: "Quality control of every feed batch, and testing for outside customers." },
  { number: "02", name: "Animal Disease Diagnostics (BSL-2)", desc: "Surveillance for swine fever, bird flu and PRRS; necropsy." },
  { number: "03", name: "Reproduction & AI", desc: "Pig semen station and cattle artificial insemination." },
  { number: "04", name: "Teaching Veterinary Clinical Complex", desc: "A hospital for livestock and pets, with imaging, theatres and ICU." },
  { number: "05", name: "Animal Genetics & Breeding", desc: "Herd records and genomic selection for pigs and the Gir herd." },
  { number: "06", name: "Food Safety & Product QC", desc: "Ghee purity, egg quality and microbiology." },
  { number: "07", name: "Microbiology & Biotech", desc: "Bio-fertiliser cultures, mushroom spawn and probiotics." },
  { number: "08", name: "Soil, Water & Environment", desc: "Soil and water testing, effluent and biogas monitoring." },
  { number: "09", name: "Precision Livestock & AI", desc: "Sensors, cameras, farm software and data science across every unit." },
  { number: "10", name: "Pre-clinical Teaching Labs", desc: "Anatomy, physiology, pathology, pharmacology and microbiology." }
];

export const researchAreas = [
  { id: "nutrition", title: "Animal nutrition", desc: "Feed formulation, local ingredients and feed efficiency trials." },
  { id: "health", title: "Animal health", desc: "Disease surveillance, vaccination and biosecurity practice." },
  { id: "breeding", title: "Breeding & genetics", desc: "Pig genetics and the improvement of indigenous Gir cattle." },
  { id: "dairy", title: "Dairy science", desc: "A2 Gir milk, traditional ghee and quality testing." },
  { id: "poultry", title: "Poultry science", desc: "Layer and broiler welfare, housing and egg quality." },
  { id: "aquaculture", title: "Aquaculture", desc: "Recirculating systems and water reuse." },
  { id: "ruminants", title: "Small ruminants", desc: "Goat breeding and nutrition for smallholders." },
  { id: "apiculture", title: "Apiculture & floriculture", desc: "Pollination, honey and flowers on organic soil." },
  { id: "renewable", title: "Renewable energy", desc: "Biogas from manure and its use on the farm." },
  { id: "soil", title: "Soil & organic inputs", desc: "Organic fertiliser, bio-cultures and soil health." },
  { id: "precision", title: "Precision farming", desc: "Sensors, automation and AI for livestock." }
];

export const sustainabilityPillars = [
  { title: "Animal welfare", desc: "Space, climate control, enrichment and humane handling, in keeping with our belief in justice for every living soul." },
  { title: "Biosecurity", desc: "Separated units, shower-in entry, controlled traffic and an on-site diagnostics lab." },
  { title: "Clean energy", desc: "Manure becomes biogas instead of a pollution problem, cutting emissions and odour." },
  { title: "Water reuse", desc: "Recycled water from the separator and fish tanks irrigates fodder and flowers." },
  { title: "Export-grade quality", desc: "The feed mill, ghee room and key labs are built to export and accreditation standards from day one." },
  { title: "Local livelihoods", desc: "Skilled jobs, student work, training for farmers and a reliable buyer and supplier for the region." }
];

export const roadmapStages = [
  { stage: "Stage 1", title: "Land & approvals", desc: "Secure the site, land-use change, environmental and pollution clearances." },
  { stage: "Stage 2", title: "Feed mill & utilities", desc: "Roads, power, water, the feed mill and the first labs." },
  { stage: "Stage 3", title: "Animal units", desc: "Pig cluster, poultry, dairy and the biogas plant come online in phases." },
  { stage: "Stage 4", title: "University", desc: "University establishment under state law; veterinary college approval." },
  { stage: "Stage 5", title: "Scale & export", desc: "Feed sales across India, accredited labs and export-ready products." }
];
