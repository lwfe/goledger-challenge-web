import * as React from "react";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Library",
      url: "#",
      items: [
        {
          title: "Playlists",
          url: "#",
          icon: "/playlist.svg",
        },
        {
          title: "Songs",
          url: "#",
          icon: "/song.svg",
        },
        {
          title: "Artists",
          url: "#",
          icon: "/artist.svg",
        },
        {
          title: "Albums",
          url: "#",
          icon: "/album.svg",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-xl text-primary px-4">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={false}>
                      <div>
                        <Image
                          alt=""
                          src={item.icon ?? ""}
                          width={16}
                          height={16}
                        />
                        <a href={item.url}>{item.title}</a>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
