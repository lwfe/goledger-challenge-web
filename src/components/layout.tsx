"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <SidebarTrigger className="-ml-1" />

      {children}
    </div>
  );
};

interface LayoutHeaderProps {
  title: string;
  description: string;

  actionLink: string;
  actionTitle: string;
}

const LayoutHeader = ({
  title,
  description,
  actionLink,
  actionTitle,
}: LayoutHeaderProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0 justify-between">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <h4>{description}</h4>
      </div>

      <Link
        href={actionLink}
        className={cn(buttonVariants({ variant: "default" }))}
      >
        {actionTitle}
      </Link>
    </div>
  );
};

export { LayoutWrapper, LayoutHeader };
