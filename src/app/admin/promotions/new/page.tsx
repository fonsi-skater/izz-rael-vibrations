import PromotionForm from "@/components/admin/PromotionForm";

export default function NewPromotionPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="text-2xl font-semibold text-brand-dark">New Promotion</h1>
      <PromotionForm />
    </div>
  );
}
