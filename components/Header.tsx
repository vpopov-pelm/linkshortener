import { Show, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className='flex items-center justify-between bg-background px-6 py-4 border-b border-border'>
      <div className='text-lg font-semibold text-foreground'>LinkShortener</div>
      <div className='flex items-center gap-4'>
        <Show when='signed-in'>
          <UserButton />
        </Show>
      </div>
    </header>
  );
}
