import { copy } from "@/lib/copy";

export default function Footer() {
  const { footer } = copy;

  return (
    <footer className="w-full bg-[#0F3D4A] text-white py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[#AEE6D8] font-bold text-lg mb-2">{footer.brand}</p>
        <p className="text-sm text-white/60">{footer.copyright}</p>
      </div>
    </footer>
  );
}
