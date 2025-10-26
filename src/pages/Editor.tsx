import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Editor = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<"python" | "lua">("python");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const exampleCode = language === "python" 
        ? `# Generated Python code\ndef hello_world():\n    print("Hello, World!")\n    return True\n\nif __name__ == "__main__":\n    hello_world()`
        : `-- Generated Lua code\nfunction helloWorld()\n    print("Hello, World!")\n    return true\nend\n\nhelloWorld()`;
      
      setCode(exampleCode);
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="min-h-screen">
      <nav className="glass fixed top-0 left-0 right-0 z-50 border-b border-white/10">
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

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-heading font-bold mb-3 gradient-text">
              AI Code Editor
            </h1>
            <p className="text-muted-foreground">
              Опиши задачу — получи готовый код
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-bold flex items-center gap-2">
                  <Icon name="MessageSquare" size={24} />
                  Твоя задача
                </h2>
                <Tabs value={language} onValueChange={(v) => setLanguage(v as "python" | "lua")}>
                  <TabsList className="bg-white/5">
                    <TabsTrigger value="python" className="data-[state=active]:gradient-bg">
                      🐍 Python
                    </TabsTrigger>
                    <TabsTrigger value="lua" className="data-[state=active]:gradient-bg">
                      🌙 Lua
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <Textarea
                placeholder="Например: Создай функцию для сортировки списка чисел..."
                className="min-h-[300px] bg-white/5 border-white/10 resize-none text-lg"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />

              <div className="flex gap-3 mt-4">
                <Button 
                  className="flex-1 gradient-bg text-lg py-6"
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                >
                  {isGenerating ? (
                    <>
                      <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                      Генерация...
                    </>
                  ) : (
                    <>
                      <Icon name="Sparkles" className="mr-2" size={20} />
                      Сгенерировать код
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/20"
                  onClick={() => {
                    setPrompt("");
                    setCode("");
                  }}
                >
                  <Icon name="RotateCcw" size={20} />
                </Button>
              </div>

              <div className="mt-6 flex items-start gap-3 glass p-4 rounded-lg">
                <Icon name="Lightbulb" className="text-yellow-400 mt-1 flex-shrink-0" size={20} />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-1">Совет:</p>
                  <p>Чем подробнее опишешь задачу, тем лучше результат. Укажи входные данные, ожидаемый результат и особые требования.</p>
                </div>
              </div>
            </Card>

            <Card className="glass p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-bold flex items-center gap-2">
                  <Icon name="Code2" size={24} />
                  Сгенерированный код
                </h2>
                {code && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-white/20"
                    onClick={handleCopy}
                  >
                    <Icon name="Copy" className="mr-2" size={16} />
                    Копировать
                  </Button>
                )}
              </div>

              <div className="relative">
                <pre className="min-h-[300px] bg-black/40 border border-white/10 rounded-lg p-6 overflow-x-auto">
                  <code className="text-sm font-mono text-green-400">
                    {code || "// Здесь появится твой код..."}
                  </code>
                </pre>
              </div>

              {code && (
                <div className="mt-6 space-y-3">
                  <div className="glass p-4 rounded-lg border-l-4 border-primary">
                    <div className="flex items-start gap-3">
                      <Icon name="CheckCircle2" className="text-green-400 mt-1 flex-shrink-0" size={20} />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Код успешно сгенерирован!</p>
                        <p className="text-muted-foreground">
                          Можешь скопировать и использовать в своем проекте.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-white/20"
                      onClick={() => setCode("")}
                    >
                      <Icon name="Trash2" className="mr-2" size={18} />
                      Очистить
                    </Button>
                    <Button 
                      className="flex-1 gradient-bg"
                      onClick={() => {
                        const blob = new Blob([code], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `code.${language === 'python' ? 'py' : 'lua'}`;
                        a.click();
                      }}
                    >
                      <Icon name="Download" className="mr-2" size={18} />
                      Скачать файл
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glass p-6 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-sm text-muted-foreground">
                Мгновенная генерация кода
              </p>
            </Card>
            <Card className="glass p-6 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <p className="text-sm text-muted-foreground">
                Точность и качество
              </p>
            </Card>
            <Card className="glass p-6 text-center">
              <div className="text-3xl mb-2">🚀</div>
              <p className="text-sm text-muted-foreground">
                Готовый к использованию код
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
