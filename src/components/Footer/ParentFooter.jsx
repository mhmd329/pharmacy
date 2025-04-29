import { Suspense } from 'react';
import Footer from './Footer';

function ParentComponent() {
  return (
    <div>
      <Suspense fallback={<div>جاري التحميل...</div>}>
        <Footer/>
      </Suspense>
    </div>
  );
}