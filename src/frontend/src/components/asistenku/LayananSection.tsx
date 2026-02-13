import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { layananData } from './layananCopy';

export default function LayananSection() {
  return (
    <section id="layanan-section" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {layananData.map((layanan) => (
            <Accordion key={layanan.id} type="single" collapsible className="w-full">
              <AccordionItem 
                value={layanan.id} 
                className="bg-white rounded-3xl shadow-md hover:shadow-lg transition-shadow border-none overflow-hidden"
              >
                <AccordionTrigger className="px-8 py-8 hover:no-underline [&[data-state=open]]:pb-6">
                  <div className="text-left space-y-3 w-full">
                    <div className="text-4xl mb-2">{layanan.emoji}</div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {layanan.title}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {layanan.description}
                    </p>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="px-8 pb-8 pt-2">
                  <div className="space-y-6 pt-4 border-t border-gray-100">
                    <p className="text-xl font-semibold text-gray-900">
                      {layanan.price}
                    </p>
                    
                    <p className="text-base text-gray-700 font-medium">
                      {layanan.details.allocation}
                    </p>
                    
                    <p className="text-base text-gray-600 leading-relaxed">
                      {layanan.details.benefit1}
                    </p>
                    
                    <p className="text-base text-gray-600 leading-relaxed">
                      {layanan.details.benefit2}
                    </p>
                    
                    <div className="pt-4">
                      <Button 
                        asChild
                        className="w-full rounded-2xl py-6 text-base shadow-md hover:shadow-lg transition-all"
                      >
                        <a href={layanan.whatsappUrl} target="_blank" rel="noopener noreferrer">
                          {layanan.buttonLabel}
                        </a>
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}
