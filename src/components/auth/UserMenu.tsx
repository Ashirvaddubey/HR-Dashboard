
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, ShieldCheck, ShieldAlert, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function UserMenu() {
  const { user, logout } = useAuth();

  if (!user) return null;

  // Function to get role icon and color it with out needs........
  const getRoleDetails = (role: string) => {
    switch (role) {
      case "admin":
        return { icon: <ShieldCheck className="h-4 w-4" />, color: "bg-blue-500" };
      case "hr":
        return { icon: <Users className="h-4 w-4" />, color: "bg-green-500" };
      default:
        return { icon: <User className="h-4 w-4" />, color: "bg-slate-500" };
    }
  };

  const roleDetails = getRoleDetails(user.role);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{user.username}</span>
              <Badge variant="outline" className="ml-2 px-1 py-0 flex items-center gap-1">
                {roleDetails.icon}
                <span>{user.role}</span>
              </Badge>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
