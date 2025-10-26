import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    setIsSubscribed(true);
  };

  const features = [
    {
      icon: "Code2",
      title: "AI Code Generation",
      description: "Генерация кода на Python и Lua с помощью ChatGPT"
    },
    {
      icon: "Zap",
      title: "Instant Results",
      description: "Мгновенное получение готового кода"
    },
    {
      icon: "Shield",
      title: "Secure & Private",
      description: "Ваш код защищен и конфиденциален"
    }
  ];

  const codeExamples = [
    { lang: "Python", icon: "🐍", color: "from-blue-500 to-cyan-500" },
    { lang: "Lua", icon: "🌙", color: "from-purple-500 to-pink-500" }
  ];

  return (
    <div className="min-h-screen">
      <nav className="glass fixed top-0 left-0 right-0 z-50 border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-heading font-bold gradient-text">CodeAI</h1>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate("/editor")} disabled={!isSubscribed}>
              <Icon name="Code" className="mr-2" size={18} />
              Редактор
            </Button>
            <Button variant="ghost" onClick={() => navigate("/admin")}>
              <Icon name="Settings" className="mr-2" size={18} />
              Админ
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-block">
              <div className="gradient-bg p-1 rounded-2xl animate-gradient-shift bg-[length:200%_200%]">
                <div className="bg-background px-6 py-2 rounded-xl">
                  <span className="text-sm font-medium gradient-text">ChatGPT Powered</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
              Создавай код с помощью{" "}
              <span className="gradient-text">искусственного интеллекта</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Генерируй качественный код на Python и Lua за секунды. ChatGPT поможет тебе решить любую задачу.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              {!isSubscribed ? (
                <Button 
                  size="lg" 
                  className="gradient-bg text-lg px-8 py-6 hover:opacity-90 transition-opacity"
                  onClick={handleSubscribe}
                >
                  <Icon name="Sparkles" className="mr-2" size={20} />
                  Подписаться за 199₽
                </Button>
              ) : (
                <div className="flex items-center gap-3 glass px-6 py-4 rounded-xl animate-glow">
                  <Icon name="CheckCircle2" className="text-green-400" size={24} />
                  <span className="font-medium">Подписка активна</span>
                </div>
              )}
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-white/20"
                onClick={() => isSubscribed && navigate("/editor")}
                disabled={!isSubscribed}
              >
                <Icon name="Play" className="mr-2" size={20} />
                Попробовать
              </Button>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
            {codeExamples.map((example) => (
              <Card 
                key={example.lang}
                className="glass p-8 hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${example.color} flex items-center justify-center text-2xl`}>
                    {example.icon}
                  </div>
                  <h3 className="text-2xl font-heading font-bold">{example.lang}</h3>
                </div>
                <p className="text-muted-foreground">
                  Генерация кода на {example.lang} с полным объяснением и комментариями
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-heading font-bold text-center mb-12 gradient-text">
            Возможности платформы
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="glass p-8 text-center hover:scale-105 transition-transform"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-bg mb-6">
                  <Icon name={feature.icon} size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 gradient-bg bg-[length:200%_200%] animate-gradient-shift">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-heading font-bold mb-6 text-white">
            Начни создавать код прямо сейчас
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Подписка открывает полный доступ к AI-редактору кода
          </p>
          {!isSubscribed && (
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 text-lg px-12 py-6 font-bold"
              onClick={handleSubscribe}
            >
              Подписаться за 199₽
            </Button>
          )}
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-muted-foreground">
            © 2024 CodeAI. Powered by ChatGPT
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
