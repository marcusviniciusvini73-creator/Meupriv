import { PageShell } from "@/components/layout";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">— Legal</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-3 text-xs text-muted-foreground">Última atualização: {updated}</p>
        <div className="mt-10 space-y-6 text-foreground/85 leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-2 [&_p]:text-[15px] [&_p]:text-foreground/80 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:text-foreground/80 [&_li]:text-[15px]">
          {children}
        </div>
      </section>
    </PageShell>
  );
}
