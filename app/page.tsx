import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
        <AboutSection />

      </main>

      {/* 页脚 */}
      <footer className="py-8 px-4 border-t border-[#222]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Logo 和简介 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[#00ff88] text-xl">{"{"}</span>
                <span className="font-bold text-white">EL</span>
                <span className="text-[#00ffff]">:</span>
                <span className="text-[#888888]">dev</span>
                <span className="text-[#00ff88] text-xl">{"}"}</span>
              </div>
              <p className="text-sm text-[#888888]">
                Building the future with code and AI.
                <br />
                Open source contributor & full-stack developer.
              </p>
            </div>

            {/* 快速链接 */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">
                <span className="text-[#00ff88]">$</span> Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-[#888888] hover:text-[#00ff88] transition-colors">
                    <span className="text-[#00ff88]">▸</span> Home
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-sm text-[#888888] hover:text-[#00ff88] transition-colors">
                    <span className="text-[#00ff88]">▸</span> Projects
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-sm text-[#888888] hover:text-[#00ff88] transition-colors">
                    <span className="text-[#00ff88]">▸</span> About
                  </a>
                </li>
              </ul>
            </div>

            {/* 社交链接 */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">
                <span className="text-[#00ff88]">$</span> Connect
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/js110"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#111] border border-[#222] rounded-lg hover:border-[#00ff88] transition-all hover:shadow-[0_0_10px_#00ff88]"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* 底部版权 */}
          <div className="mt-8 pt-8 border-t border-[#222] text-center">
            <p className="text-sm text-[#888888]">
              <span className="text-[#00ff88]">©</span> 2024 蒋胜. All rights reserved.
              <br />
              <span className="text-[#888888]">Built with</span>{" "}
              <span className="text-[#00ffff]">Next.js</span>,{" "}
              <span className="text-[#00ffff]">TypeScript</span>, and{" "}
              <span className="text-[#00ffff]">Tailwind CSS</span>
            </p>
            <p className="text-xs text-[#444] mt-2">
              <span className="text-[#00ff88]">$</span> echo "Keep hacking, keep learning"
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
