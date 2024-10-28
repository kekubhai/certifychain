"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScrollText } from "lucide-react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="flex items-center space-x-2">
        <ScrollText className="h-6 w-6" />
        <span className="font-bold">CertifyChain</span>
      </Link>
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        Dashboard
      </Link>
      <Link href="/certificates" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Certificates
      </Link>
      <Link href="/shared" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Shared
      </Link>
    </nav>
  );
}