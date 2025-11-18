"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut, Settings, User } from "lucide-react";

interface UserNavProps {
  user: {
    email: string;
    displayName?: string;
  };
}

export function UserNav({ user }: UserNavProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  const initials = user.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.email[0].toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-blue-500">
            <AvatarFallback className="bg-blue-600 text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 bg-slate-900 border-slate-700"
        align="end"
      >
        <DropdownMenuLabel className="text-slate-200">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.displayName || "Người dùng"}
            </p>
            <p className="text-xs leading-none text-slate-400">{user.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-slate-700" />

        {/* Nút Hồ sơ */}
        <DropdownMenuItem
          onClick={() => router.push("/profile")}
          className="text-slate-200 focus:bg-slate-800 cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" /> Hồ sơ
        </DropdownMenuItem>

        {/* Nút Cài đặt */}
        <DropdownMenuItem
          onClick={() => router.push("/settings")}
          className="text-slate-200 focus:bg-slate-800 cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" /> Cài đặt
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-slate-700" />

        {/* Đăng xuất */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-400 focus:bg-slate-800 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" /> Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
