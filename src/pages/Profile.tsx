import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { User, Bell, Shield, ArrowLeft, Camera, KeyRound } from 'lucide-react';

// Importe a sua imagem de perfil local com um nome simples e web-amigável
import profileImage from '@/assets/profile-picture.png'; 

// Sub-componente para a aba de Perfil
const ProfileTabContent = () => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle>Informações do Perfil</CardTitle>
        <CardDescription>Atualize a sua foto e detalhes pessoais aqui.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-24 w-24">
            {/* Use a imagem importada aqui */}
            <AvatarImage src={profileImage} alt="Carlos Vinicios" />
            <AvatarFallback>CV</AvatarFallback>
          </Avatar>
          <Button variant="outline">
            <Camera className="w-4 h-4 mr-2" />
            Alterar Foto
          </Button>
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" defaultValue="Carlos Vinicios" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="carlos.vinicios@example.com" />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button>Guardar Alterações</Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Sub-componente para a aba de Notificações
const NotificationsTabContent = () => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle>Notificações</CardTitle>
        <CardDescription>Escolha como e sobre o que quer ser notificado.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg border">
          <div>
            <Label htmlFor="price-alerts" className="font-medium">Alertas de Preço</Label>
            <p className="text-sm text-muted-foreground">Receber notificações sobre mudanças significativas nos preços.</p>
          </div>
          <Switch id="price-alerts" defaultChecked />
        </div>
        <div className="flex items-center justify-between p-4 rounded-lg border">
          <div>
            <Label htmlFor="market-news" className="font-medium">Notícias do Mercado</Label>
            <p className="text-sm text-muted-foreground">Receber um resumo diário das principais notícias do agronegócio.</p>
          </div>
          <Switch id="market-news" />
        </div>
        <div className="flex items-center justify-between p-4 rounded-lg border">
          <div>
            <Label htmlFor="ai-analysis" className="font-medium">Análises da IA</Label>
            <p className="text-sm text-muted-foreground">Ser notificado quando uma nova análise de IA estiver disponível.</p>
          </div>
          <Switch id="ai-analysis" defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
};

// Sub-componente para a aba de Segurança
const SecurityTabContent = () => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle>Senha e Segurança</CardTitle>
        <CardDescription>Altere a sua senha para manter a sua conta segura.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-password">Senha Atual</Label>
          <Input id="current-password" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">Nova Senha</Label>
          <Input id="new-password" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
          <Input id="confirm-password" type="password" />
        </div>
        <div className="flex justify-end pt-2">
          <Button>
            <KeyRound className="w-4 h-4 mr-2" />
            Alterar Senha
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente principal da Página de Perfil
const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTabContent />;
      case 'notifications':
        return <NotificationsTabContent />;
      case 'security':
        return <SecurityTabContent />;
      default:
        return <ProfileTabContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <header className="bg-white/90 backdrop-blur-xl border-b border-emerald-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
              AgriPredict
            </span>
          </Link>
          <Button asChild variant="outline" size="sm">
            <Link to="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Dashboard
            </Link>
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">A sua Conta</h1>
          <p className="text-gray-500">Faça a gestão das suas informações de perfil e configurações de segurança.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Menu Lateral de Navegação */}
          <aside className="md:col-span-1">
            <nav className="flex flex-col space-y-1">
              <Button
                variant={activeTab === 'profile' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('profile')}
              >
                <User className="w-4 h-4 mr-2" />
                Perfil
              </Button>
              <Button
                variant={activeTab === 'notifications' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('notifications')}
              >
                <Bell className="w-4 h-4 mr-2" />
                Notificações
              </Button>
              <Button
                variant={activeTab === 'security' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('security')}
              >
                <Shield className="w-4 h-4 mr-2" />
                Segurança
              </Button>
            </nav>
          </aside>

          {/* Área de Conteúdo Principal */}
          <div className="md:col-span-3">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;