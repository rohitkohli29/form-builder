import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FormInput } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className='w-auto flex items-center justify-center mx-auto '>
          <h1 className="text-4xl font-bold tracking-tight relative">
            Welcome to Form Builder
            <span className='absolute right-12 -bottom-5 md:-right-4  text-red-400 text-sm'>By- Rohit Kohli</span>
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Create beautiful, customizable forms with our drag-and-drop builder.
          Add fields, customize themes, and preview your forms in real-time.
        </p>
        <div className='my-2'>  
          <Link href="/form-builder">
            <Button size="lg" className="gap-2">
              <FormInput className="h-5 w-5" />
              Open Form Builder
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}