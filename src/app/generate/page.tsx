'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  AppWindow,
  ArrowLeft,
  BookOpenText,
  Copy,
  Download,
  Loader2,
  Sparkles,
  Store,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { generatePolicyAction, summarizePolicyAction } from './actions';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const templates = [
  {
    id: 'ecommerce',
    name: 'E-Ticaret Sitesi',
    description: 'Online ürün satışı yapan platformlar için idealdir.',
    icon: Store,
  },
  {
    id: 'saas',
    name: 'SaaS Uygulaması',
    description: 'Abonelik tabanlı yazılım hizmetleri için uygundur.',
    icon: AppWindow,
  },
  {
    id: 'blog',
    name: 'Blog veya İçerik Sitesi',
    description: 'Kişisel bloglar ve içerik odaklı web siteleri için temel şablon.',
    icon: BookOpenText,
  },
];

const formSchema = z.object({
  companyName: z.string().min(2, 'Şirket adı en az 2 karakter olmalıdır.'),
  websiteURL: z.string().url('Lütfen geçerli bir URL girin.'),
  effectiveDate: z.string().min(1, 'Yürürlük tarihi zorunludur.'),
  contactInformation: z.string().min(10, 'İletişim bilgileri en az 10 karakter olmalıdır.'),
  dataCollectionPractices: z.string().min(20, 'Bu alan en az 20 karakter olmalıdır.'),
  dataUsagePractices: z.string().min(20, 'Bu alan en az 20 karakter olmalıdır.'),
  dataSharingPractices: z.string().min(20, 'Bu alan en az 20 karakter olmalıdır.'),
  dataSecurityMeasures: z.string().min(20, 'Bu alan en az 20 karakter olmalıdır.'),
  userRights: z.string().min(20, 'Bu alan en az 20 karakter olmalıdır.'),
});

type Step = 1 | 2 | 3;

export default function GeneratePage() {
  const [step, setStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof templates)[0] | null>(null);
  const [generatedPolicy, setGeneratedPolicy] = useState<string | null>(null);
  const [policySummary, setPolicySummary] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      websiteURL: '',
      effectiveDate: new Date().toLocaleDateString('tr-TR'),
      contactInformation: '',
      dataCollectionPractices: 'Kullanıcı adı, e-posta, IP adresi, çerezler gibi standart veriler.',
      dataUsagePractices: 'Hizmet sunumu, kullanıcı deneyimini iyileştirme, pazarlama.',
      dataSharingPractices: 'Yasal zorunluluklar veya iş ortakları (analitik servisleri gibi) dışında paylaşılmaz.',
      dataSecurityMeasures: 'Veri şifreleme, güvenli sunucular, erişim kontrolleri.',
      userRights: 'Kullanıcılar verilerine erişebilir, düzeltebilir ve silebilir.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedPolicy(null);
    setPolicySummary(null);
    try {
      const result = await generatePolicyAction(values);
      if (result.privacyPolicy) {
        setGeneratedPolicy(result.privacyPolicy);
        setStep(3);
        const summaryResult = await summarizePolicyAction({
          privacyPolicyText: result.privacyPolicy,
        });
        setPolicySummary(summaryResult.summary);
        toast({
          title: 'Başarılı!',
          description: 'Gizlilik politikanız ve özeti oluşturuldu.',
        });
      } else {
        throw new Error('AI service failed to generate a policy.');
      }
    } catch (error) {
      toast({
        title: 'Hata Oluştu',
        description: 'Politika oluşturulurken bir sorunla karşılaşıldı. Lütfen tekrar deneyin.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Kopyalandı!', description: 'Metin panoya kopyalandı.' });
  };
  
  const handleDownload = (text: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gizlilik-politikasi.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold">Adım 1: Şablon Seçin</h2>
            <p className="mt-2 text-muted-foreground">İş modelinize en uygun şablonla başlayın.</p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className="cursor-pointer text-left transition-all hover:border-accent hover:shadow-lg"
                  onClick={() => {
                    setSelectedTemplate(template);
                    setStep(2);
                  }}
                >
                  <CardHeader>
                    <template.icon className="mb-4 h-10 w-10 text-accent" />
                    <CardTitle className="font-headline">{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{template.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <Button variant="ghost" onClick={() => setStep(1)} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Geri Dön
            </Button>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-3xl">Adım 2: Özelleştirin</CardTitle>
                <CardDescription>
                  Lütfen aşağıdaki bilgileri doldurarak politikanızı kişiselleştirin.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Şirket Adı</FormLabel>
                            <FormControl>
                              <Input placeholder="Şirketinizin adı" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="websiteURL"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Web Sitesi URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://ornek.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="effectiveDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Yürürlük Tarihi</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contactInformation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>İletişim Bilgileri</FormLabel>
                            <FormControl>
                              <Input placeholder="iletisim@ornek.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="dataCollectionPractices"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Veri Toplama Uygulamaları</FormLabel>
                          <FormControl>
                            <Textarea rows={4} {...field} />
                          </FormControl>
                          <FormDescription>Hangi kişisel verileri topluyorsunuz?</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="dataUsagePractices"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Veri Kullanım Uygulamaları</FormLabel>
                          <FormControl>
                            <Textarea rows={4} {...field} />
                          </FormControl>
                          <FormDescription>Topladığınız verileri nasıl kullanıyorsunuz?</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="dataSharingPractices"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Veri Paylaşım Uygulamaları</FormLabel>
                          <FormControl>
                            <Textarea rows={4} {...field} />
                          </FormControl>
                           <FormDescription>Verileri üçüncü taraflarla paylaşıyor musunuz?</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dataSecurityMeasures"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Veri Güvenliği Önlemleri</FormLabel>
                          <FormControl>
                            <Textarea rows={4} {...field} />
                          </FormControl>
                          <FormDescription>Kullanıcı verilerini nasıl koruyorsunuz?</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="userRights"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kullanıcı Hakları</FormLabel>
                          <FormControl>
                            <Textarea rows={4} {...field} />
                          </FormControl>
                          <FormDescription>Kullanıcıların verileriyle ilgili hakları nelerdir?</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isLoading} size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                      )}
                      Politika Oluştur
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        );
      case 3:
        return (
          <div>
            <Button variant="ghost" onClick={() => { setStep(1); setGeneratedPolicy(null); }} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Yeni Politika Oluştur
            </Button>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-headline text-3xl">Adım 3: Politikanız Hazır!</CardTitle>
                    <CardDescription>
                      Aşağıda sizin için oluşturulan gizlilik politikasını bulabilirsiniz.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <ScrollArea className="h-[600px] rounded-md border p-4">
                        <pre className="whitespace-pre-wrap text-sm font-sans">
                          {generatedPolicy || 'Politika metni yükleniyor...'}
                        </pre>
                      </ScrollArea>
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleCopy(generatedPolicy || '')}>
                          <Copy className="h-4 w-4" />
                        </Button>
                         <Button variant="outline" size="icon" onClick={() => handleDownload(generatedPolicy || '')}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="sticky top-20 bg-primary/20 border-primary">
                  <CardHeader>
                     <CardTitle className="font-headline flex items-center gap-2"><Sparkles className="h-5 w-5 text-accent"/> Politika Özeti</CardTitle>
                     <CardDescription>Yapay zeka tarafından oluşturulan özet.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Separator className="my-4"/>
                    {policySummary ? (
                       <p className="text-sm text-foreground/80">{policySummary}</p>
                    ) : (
                      <div className="space-y-2">
                        <div className="h-4 w-full animate-pulse rounded bg-muted-foreground/20"></div>
                        <div className="h-4 w-full animate-pulse rounded bg-muted-foreground/20"></div>
                        <div className="h-4 w-5/6 animate-pulse rounded bg-muted-foreground/20"></div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 md:py-20">{renderStepContent()}</div>
      </main>
      <Footer />
    </div>
  );
}
