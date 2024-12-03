import { LayoutHeader, LayoutWrapper } from "@/components/layout";

export default function SongsPage() {
  return (
    <LayoutWrapper>
      <LayoutHeader
        title="Songs"
        description="Here's a list of available songs"
        actionLink="/songs/new"
        actionTitle="+ Create Song"
      />

      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </LayoutWrapper>
  );
}
