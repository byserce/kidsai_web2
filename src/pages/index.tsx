import Link from 'next/link';
import Image from 'next/image';
import { FileText, Settings2, Sparkles, Server, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: FileText,
    title: 'Şablon Seçimi',
    description: 'İş modelinize en uygun, profesyonelce hazırlanmış gizlilik politikası şablonlarından birini seçin.',
    image: PlaceHolderImages.find(p => p.id === 'template-selection'),
  },
  {
    icon: Settings2,
    title: 'Kolay Özelleştirme',
    description: 'Seçtiğiniz şablonu, şirket bilgilerinizi ve veri işleme süreçlerinizi girerek kolayca kişiselleştirin.',
    image: PlaceHolderImages.find(p => p.id === 'customization'),
  },
  {
    icon: Sparkles,
    title: 'Yapay Zeka Destekli Oluşturma',
    description: 'Gelişmiş yapay zeka teknolojimiz, verdiğiniz bilgilere dayanarak size özel, kapsamlı bir gizlilik politikası metni oluşturur.',
    image: PlaceHolderImages.find(p => p.id === 'ai-generation'),
  },
  {
    icon: Server,
    title: 'Politika Barındırma',
    description: 'Oluşturduğunuz politikayı sizin için barındırıyor ve sitenize kolayca ekleyebileceğiniz bir URL sağlıyoruz.',
    image: PlaceHolderImages.find(p => p.id === 'hosting'),
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
        <section className="py-20 md:py-32">
          <div className="container text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Gizlilik Politikanızı Saniyeler İçinde Oluşturun
            </h1>
            <p className="mx-auto mt-6 max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Gizlilik Kalkanı ile web siteniz veya uygulamanız için yasalara uygun, profesyonel gizlilik politikaları hazırlamak artık çok kolay.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/#features">
                  Hemen Başla <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 md:py-32 bg-white dark:bg-card">
          <div className="container">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Neden Gizlilik Kalkanı?</h2>
              <p className="mt-4 text-muted-foreground">
                Süreci basitleştiren güçlü özelliklerimizle tanışın.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
              {features.map((feature) => (
                <Card key={feature.title} className="overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                  {feature.image && (
                    <Image
                      src={feature.image.imageUrl}
                      alt={feature.description}
                      data-ai-hint={feature.image.imageHint}
                      width={600}
                      height={400}
                      className="w-full object-cover"
                    />
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <feature.icon className="h-8 w-8 text-accent" />
                      <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
    </div>
  );
}
