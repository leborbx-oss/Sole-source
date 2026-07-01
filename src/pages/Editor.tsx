import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Code2, Play, RotateCcw, Copy, AlertCircle } from 'lucide-react';

export const Editor = () => {
  const [code, setCode] = useState('// Welcome to SOLE SOURCE Editor\n\nfunction showcase() {\n  console.log("Stepping into the future...");\n}\n\nshowcase();');
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const [output, setOutput] = useState<string[]>([]);
  const [isError, setIsError] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const lineCount = code.split('\n').length;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleReset = () => {
    setCode('// Write your code here...');
    setOutput([]);
    setIsError(false);
  };

  const updateCursorPos = () => {
    if (!textareaRef.current) return;
    const textBeforeCursor = code.substring(0, textareaRef.current.selectionStart);
    const lines = textBeforeCursor.split('\n');
    setCursorPos({
      line: lines.length,
      col: lines[lines.length - 1].length + 1
    });
  };

  const runCode = () => {
    setOutput([]);
    setIsError(false);
    const logs: string[] = [];

    // Simple console.log override for the eval context
    const customConsole = {
      log: (...args: any[]) => {
        logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
      },
      error: (...args: any[]) => {
        setIsError(true);
        logs.push('ERROR: ' + args.map(arg => String(arg)).join(' '));
      }
    };

    try {
      // Create a function from the code and execute it with our custom console
      const execute = new Function('console', code);
      execute(customConsole);
      if (logs.length === 0) logs.push('Code executed successfully (no output).');
      setOutput(logs);
    } catch (err) {
      setIsError(true);
      setOutput([String(err)]);
    }
  };

  useEffect(() => {
    updateCursorPos();
  }, [code]);

  return (
    <div className="pt-20 min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="font-display text-5xl md:text-7xl tracking-tighter text-white leading-none">
              CODE <span className="text-neon-green">EDITOR</span>
            </h1>
            <p className="text-white/60 mt-2 font-mono text-sm">DEVELOPMENT_ENVIRONMENT // V1.1</p>
          </motion.div>

          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="p-3 border border-white/10 hover:bg-white hover:text-black transition-colors"
              aria-label="Copy code to clipboard"
              title="Copy Code"
            >
              <Copy size={18} />
            </button>
            <button
              onClick={handleReset}
              className="p-3 border border-white/10 hover:bg-white hover:text-black transition-colors"
              aria-label="Reset editor content"
              title="Reset"
            >
              <RotateCcw size={18} />
            </button>
            <button
              onClick={runCode}
              className="bg-neon-green text-black px-6 py-3 font-bold tracking-widest hover:bg-white transition-colors flex items-center gap-2"
            >
              <Play size={18} /> RUN_CODE
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative bg-neutral-900 border border-white/10 overflow-hidden"
            >
              {/* Editor Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-neutral-800/50 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-brand-red/50" />
                    <div className="w-3 h-3 rounded-full bg-neutral-600" />
                    <div className="w-3 h-3 rounded-full bg-neon-green/50" />
                  </div>
                  <span className="text-[10px] font-mono text-white/40 ml-2 tracking-widest uppercase flex items-center gap-2">
                    <Code2 size={12} /> main.js
                  </span>
                </div>
                <div className="text-[10px] font-mono text-white/20 tracking-widest">UTF-8</div>
              </div>

              {/* Editor Input Area */}
              <div className="flex min-h-[60vh] overflow-auto">
                <div className="w-12 bg-neutral-800/30 border-r border-white/5 flex flex-col items-center py-4 text-[10px] font-mono text-white/20 select-none">
                  {[...Array(Math.max(20, lineCount))].map((_, i) => (
                    <div key={i} className="leading-6">{i + 1}</div>
                  ))}
                </div>
                <label htmlFor="code-input" className="sr-only">Code Input</label>
                <textarea
                  id="code-input"
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyUp={updateCursorPos}
                  onMouseUp={updateCursorPos}
                  className="flex-grow bg-transparent text-white font-mono text-sm p-4 resize-none focus:outline-none leading-6 selection:bg-neon-green selection:text-black whitespace-pre overflow-hidden"
                  spellCheck={false}
                />
              </div>

              {/* Bottom Bar */}
              <div className="px-4 py-2 bg-neutral-800/50 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-white/40">
                <div className="flex gap-4">
                  <span>Ln {cursorPos.line}, Col {cursorPos.col}</span>
                  <span>Spaces: 2</span>
                </div>
                <div className="text-neon-green/60">READY</div>
              </div>
            </motion.div>
          </div>

          {/* Output Panel */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-grow bg-neutral-900 border border-white/10 flex flex-col"
            >
              <div className="px-4 py-3 bg-neutral-800/50 border-b border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase flex items-center gap-2">
                  <Play size={12} /> Console_Output
                </span>
                {isError && <AlertCircle size={12} className="text-brand-red" />}
              </div>
              <div className="flex-grow p-4 font-mono text-sm overflow-auto max-h-[50vh]">
                {output.length > 0 ? (
                  output.map((line, i) => (
                    <div key={i} className={cn("mb-1", isError ? "text-brand-red" : "text-white/80")}>
                      <span className="text-white/20 mr-2 opacity-50">&gt;</span>
                      {line}
                    </div>
                  ))
                ) : (
                  <div className="text-white/20 italic">No output yet. Click RUN_CODE to execute.</div>
                )}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-4">
              <div className="p-6 bg-neutral-900/50 border border-white/5">
                <h3 className="text-neon-green font-mono text-xs mb-2 tracking-widest uppercase">System_Status</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                  <span className="text-[10px] font-mono text-white/60">OPERATIONAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default Editor;
