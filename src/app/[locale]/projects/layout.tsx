import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "SaaS, AI, web, automation, experiments, client projects, and tools by Suleman Hussain.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
