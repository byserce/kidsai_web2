export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex h-24 flex-col items-center justify-between gap-4 py-6 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Gizlilik Kalkanı. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
