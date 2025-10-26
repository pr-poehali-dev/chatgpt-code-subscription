import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Editor = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string, code?: string}>>([]);
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState<"python" | "lua">("python");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    const userMessage = prompt;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setPrompt("");
    setIsGenerating(true);
    
    setTimeout(() => {
      const exampleCode = language === "python" 
        ? `# Generated Python code\ndef process_data(items):\n    result = []\n    for item in items:\n        if item > 0:\n            result.append(item * 2)\n    return result\n\ndata = [1, -2, 3, 4, -5]\nprint(process_data(data))`
        : `-- Generated Lua code\nfunction processData(items)\n    local result = {}\n    for _, item in ipairs(items) do\n        if item > 0 then\n            table.insert(result, item * 2)\n        end\n    end\n    return result\nend\n\nlocal data = {1, -2, 3, 4, -5}\nprint(processData(data))`;
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Готово! Вот твой код:',
        code: exampleCode 
      }]);
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="glass border-b border-white/10 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 
            className="text-2xl font-heading font-bold gradient-text cursor-pointer"
            onClick={() => navigate("/")}
          >
            CodeAI
          </h1>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <Icon name="Home" className="mr-2" size={18} />
              Главная
            </Button>
            <Button variant="ghost" onClick={() => navigate("/admin")}>
              <Icon name="Settings" className="mr-2" size={18} />
              Админ
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 border-r border-white/10 flex flex-col">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-heading font-bold gradient-text flex items-center gap-2">
              <Icon name="MessageSquare" size={28} />
              AI Ассистент
            </h2>
            <div className="flex gap-2 mt-4">
              <Button
                size="sm"
                variant={language === "python" ? "default" : "outline"}
                onClick={() => setLanguage("python")}
                className={language === "python" ? "gradient-bg" : "border-white/20"}
              >
                🐍 Python
              </Button>
              <Button
                size="sm"
                variant={language === "lua" ? "default" : "outline"}
                onClick={() => setLanguage("lua")}
                className={language === "lua" ? "gradient-bg" : "border-white/20"}
              >
                🌙 Lua
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <Card className="glass p-6 border border-white/10">
                <div className="text-center space-y-4">
                  <Icon name="Sparkles" size={48} className="mx-auto text-primary" />
                  <div>
                    <h3 className="text-xl font-heading font-bold mb-2">Привет! Я твой AI помощник</h3>
                    <p className="text-muted-foreground">
                      Опиши задачу, и я сгенерирую код на {language === "python" ? "Python" : "Lua"}
                    </p>
                  </div>
                  <div className="text-left space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={16} className="mt-0.5 text-green-400 flex-shrink-0" />
                      Опиши подробно, что нужно сделать
                    </p>
                    <p className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={16} className="mt-0.5 text-green-400 flex-shrink-0" />
                      Укажи входные данные и результат
                    </p>
                    <p className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={16} className="mt-0.5 text-green-400 flex-shrink-0" />
                      Получи готовый код и используй
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {messages.map((msg, idx) => (
              <div key={idx} className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <Card className={`glass p-4 max-w-[85%] ${msg.role === 'user' ? 'gradient-bg' : 'bg-white/5'}`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  {msg.code && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground font-mono">{language}</span>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleCopy(msg.code!)}
                        >
                          <Icon name="Copy" size={14} />
                        </Button>
                      </div>
                      <pre className="bg-gradient-to-br from-slate-900 to-slate-800 border border-violet-500/20 rounded p-3 overflow-x-auto text-xs">
                        <code className="font-mono text-cyan-300">{msg.code}</code>
                      </pre>
                    </div>
                  )}
                </Card>
              </div>
            ))}

            {isGenerating && (
              <div className="flex justify-start">
                <Card className="glass p-4 bg-white/5">
                  <div className="flex items-center gap-2">
                    <Icon name="Loader2" className="animate-spin" size={16} />
                    <span className="text-sm text-muted-foreground">Генерирую код...</span>
                  </div>
                </Card>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/10 glass">
            <div className="flex gap-2">
              <Textarea
                placeholder="Опиши задачу..."
                className="bg-white/5 border-white/10 resize-none"
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
              />
              <Button 
                className="gradient-bg self-end"
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
              >
                <Icon name="Send" size={20} />
              </Button>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col bg-black/20">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-heading font-bold gradient-text flex items-center gap-2">
              <Icon name="Code2" size={28} />
              Live Preview
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Весь сгенерированный код появится здесь
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {messages.filter(m => m.code).length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-3 text-muted-foreground">
                  <Icon name="FileCode2" size={64} className="mx-auto opacity-20" />
                  <p>Код появится после генерации</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.filter(m => m.code).map((msg, idx) => (
                  <Card key={idx} className="glass p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <span className="text-sm font-mono text-muted-foreground">
                          {language}.{language === 'python' ? 'py' : 'lua'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-white/20"
                          onClick={() => handleCopy(msg.code!)}
                        >
                          <Icon name="Copy" className="mr-2" size={14} />
                          Копировать
                        </Button>
                        <Button 
                          size="sm"
                          className="gradient-bg"
                          onClick={() => {
                            const blob = new Blob([msg.code!], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `code.${language === 'python' ? 'py' : 'lua'}`;
                            a.click();
                          }}
                        >
                          <Icon name="Download" size={14} />
                        </Button>
                      </div>
                    </div>
                    <pre className="bg-gradient-to-br from-slate-900 to-slate-800 border border-violet-500/20 rounded-lg p-4 overflow-x-auto">
                      <code className="text-sm font-mono text-cyan-300">{msg.code}</code>
                    </pre>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;