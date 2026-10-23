export const projects = [
  { id: "P-101", name: "Harbor Tower, Block A", progress: 72, delayed: false },
  { id: "P-102", name: "Metro Logistics Hub", progress: 45, delayed: true },
  { id: "P-103", name: "Riverside Medical Centre", progress: 88, delayed: false },
];
export const trades = ["Engineers", "Welders", "Electricians", "HVAC Technicians", "General Labor"];
export const materials = [
  { n: "Concrete", u: "m³" }, { n: "Rebar", u: "t" }, { n: "Piping", u: "m" }, { n: "Ductwork", u: "m" },
];
export type Punch = { id: string; location: string; issue: string; severity: "Low" | "Medium" | "High"; status: "Pending" | "In Progress" | "Resolved"; assignee: string };
export const punch: Punch[] = [
  { id: "PL-014", location: "Block A, Level 6", issue: "Rebar cover below spec at slab edge", severity: "High", status: "Pending", assignee: "R. Hasanov" },
  { id: "PL-013", location: "Hub, Dock 2", issue: "Ductwork hanger spacing exceeds limit", severity: "Medium", status: "In Progress", assignee: "L. Mammadova" },
  { id: "PL-012", location: "Medical, Plant Room", issue: "Unlabelled electrical panel", severity: "Low", status: "Resolved", assignee: "T. Aliyev" },
  { id: "PL-011", location: "Block A, Level 4", issue: "Weld inspection report missing", severity: "High", status: "In Progress", assignee: "S. Karimov" },
];
export const sampleDpr = {
  project: "Harbor Tower, Block A", date: "2026-10-23", contractor: "Apex Structures LLC", weather: "Clear, 31°C",
  workforce: [["Engineers", 6, 48], ["Welders", 14, 112], ["Electricians", 9, 72], ["HVAC Technicians", 7, 56], ["General Labor", 38, 304]],
  materials: [["Concrete", "86 m³"], ["Rebar", "12.4 t"], ["Piping", "240 m"], ["Ductwork", "130 m"]],
  work: "Level 6 slab pour completed. Rebar tied for Level 7 columns. HVAC main trunk ductwork installed on Level 3. Conduit rough-in 80% done on Level 4.",
  pct: 72, signer: "R. Hasanov, Project Manager",
  photos: ["Level 6 slab pour", "Level 7 column rebar", "Level 3 trunk ductwork"],
};
