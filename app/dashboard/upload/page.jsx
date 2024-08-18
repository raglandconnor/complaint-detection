import { Navbar } from '../components/navbar/navbar';
import { FormCard } from './components/form-card';

const UploadPage = () => {
  return (
    <main className="flex flex-col">
      <Navbar />
      <section className="flex items-center justify-center">
        <FormCard />
      </section>
    </main>
  );
};

export default UploadPage;
