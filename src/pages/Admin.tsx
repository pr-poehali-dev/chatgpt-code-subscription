import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: string;
  email: string;
  subscribed: boolean;
  subscribedDate?: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([
    { id: "1", email: "user1@example.com", subscribed: true, subscribedDate: "2024-01-15" },
    { id: "2", email: "user2@example.com", subscribed: false },
    { id: "3", email: "user3@example.com", subscribed: true, subscribedDate: "2024-02-20" },
  ]);
  const [searchEmail, setSearchEmail] = useState("");

  const toggleSubscription = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { 
            ...user, 
            subscribed: !user.subscribed,
            subscribedDate: !user.subscribed ? new Date().toISOString().split('T')[0] : undefined
          }
        : user
    ));
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  const stats = {
    total: users.length,
    subscribed: users.filter(u => u.subscribed).length,
    revenue: users.filter(u => u.subscribed).length * 199
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
            <Button variant="ghost" onClick={() => navigate("/editor")}>
              <Icon name="Code" className="mr-2" size={18} />
              Редактор
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-heading font-bold mb-3 gradient-text">
              Админ-панель
            </h1>
            <p className="text-muted-foreground">
              Управление подписками пользователей
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Всего пользователей</p>
                  <p className="text-3xl font-heading font-bold">{stats.total}</p>
                </div>
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                  <Icon name="Users" size={24} className="text-white" />
                </div>
              </div>
            </Card>

            <Card className="glass p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Активных подписок</p>
                  <p className="text-3xl font-heading font-bold">{stats.subscribed}</p>
                </div>
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                  <Icon name="UserCheck" size={24} className="text-white" />
                </div>
              </div>
            </Card>

            <Card className="glass p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Общий доход</p>
                  <p className="text-3xl font-heading font-bold">{stats.revenue}₽</p>
                </div>
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} className="text-white" />
                </div>
              </div>
            </Card>
          </div>

          <Card className="glass p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold">
                Пользователи
              </h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={18} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    placeholder="Поиск по email..."
                    className="pl-10 bg-white/5 border-white/10 w-[300px]"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="border border-white/10 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-white/10">
                    <TableHead className="text-muted-foreground">Email</TableHead>
                    <TableHead className="text-muted-foreground">Статус</TableHead>
                    <TableHead className="text-muted-foreground">Дата подписки</TableHead>
                    <TableHead className="text-muted-foreground text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="border-white/10">
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell>
                        {user.subscribed ? (
                          <Badge className="gradient-bg">
                            <Icon name="CheckCircle2" className="mr-1" size={14} />
                            Активна
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-white/20">
                            <Icon name="XCircle" className="mr-1" size={14} />
                            Неактивна
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {user.subscribedDate || "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant={user.subscribed ? "outline" : "default"}
                          className={user.subscribed ? "border-white/20" : "gradient-bg"}
                          onClick={() => toggleSubscription(user.id)}
                        >
                          {user.subscribed ? (
                            <>
                              <Icon name="UserMinus" className="mr-2" size={16} />
                              Отменить
                            </>
                          ) : (
                            <>
                              <Icon name="UserPlus" className="mr-2" size={16} />
                              Выдать подписку
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Icon name="SearchX" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Пользователи не найдены
                </p>
              </div>
            )}
          </Card>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                  <Icon name="Shield" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-bold mb-2">Безопасность</h3>
                  <p className="text-sm text-muted-foreground">
                    Все изменения подписок логируются. Пользователи получают уведомления об изменениях статуса.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                  <Icon name="CreditCard" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-bold mb-2">Стоимость подписки</h3>
                  <p className="text-sm text-muted-foreground">
                    Текущая цена: 199₽ в месяц. Автоматическое продление и управление платежами.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
