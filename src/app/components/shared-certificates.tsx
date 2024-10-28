"use client";

import { Calendar, Download, Link, MoreVertical, Share2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const sharedCertificates = [
  {
    id: 1,
    name: "Project Management Professional",
    issuer: "PMI",
    date: "2024-03-01",
    sharedWith: ["alice@example.com", "bob@example.com"],
    expiresAt: "2024-04-01",
  },
  {
    id: 2,
    name: "Cybersecurity Specialist",
    issuer: "CompTIA",
    date: "2024-02-15",
    sharedWith: ["security@company.com"],
    expiresAt: "2024-03-15",
  },
];

export function SharedCertificates() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sharedCertificates.map((cert) => (
        <div
          key={cert.id}
          className="group relative rounded-lg border p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="font-semibold leading-none tracking-tight">
                {cert.name}
              </h3>
              <p className="text-sm text-muted-foreground">{cert.issuer}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share with More
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link className="mr-2 h-4 w-4" />
                  Copy Share Link
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            Shared on: {new Date(cert.date).toLocaleDateString()}
          </div>
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <Users className="mr-1 h-4 w-4" />
            Shared with {cert.sharedWith.length} user{cert.sharedWith.length !== 1 ? 's' : ''}
          </div>
          <div className="mt-4">
            <Badge variant="secondary">
              Expires: {new Date(cert.expiresAt).toLocaleDateString()}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}