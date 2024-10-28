/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Award, Calendar, Download, Link, MoreVertical, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UploadCertificate } from "./upload-certicate";
import { categories, Certificate, getCertificates, saveCertificates, } from "@/lib/certificates";

function SortableCertificate({ certificate }: { certificate: Certificate }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: certificate.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group relative rounded-lg border p-6 hover:shadow-md transition-shadow cursor-move"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="font-semibold leading-none tracking-tight">
            {certificate.name}
          </h3>
          <p className="text-sm text-muted-foreground">{certificate.issuer}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Download
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="mr-2 h-4 w-4" />
              Copy Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-4">
        <Badge variant="secondary">{certificate.category}</Badge>
      </div>
      <div className="mt-2 text-sm text-muted-foreground">
        {certificate.description}
      </div>
      <div className="mt-4 flex items-center text-sm text-muted-foreground">
        <Calendar className="mr-1 h-4 w-4" />
        {new Date(certificate.date).toLocaleDateString()}
      </div>
      <div className="mt-4 flex items-center text-sm">
        <Award className="mr-1 h-4 w-4 text-green-500" />
        <span className="text-green-500">Verified</span>
      </div>
    </div>
  );
}

export function CertificateGrid() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setCertificates(getCertificates());
  }, []);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCertificates((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        saveCertificates(newItems);
        return newItems;
      });
    }
  }

  const filteredCertificates = certificates.filter(
    (cert) => activeCategory === "all" || cert.category === activeCategory
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={setActiveCategory}
        >
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="ml-4">
          <UploadCertificate
            onSuccess={() => setCertificates(getCertificates())}
          />
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredCertificates}
          strategy={rectSortingStrategy}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCertificates.map((certificate) => (
              <SortableCertificate
                key={certificate.id}
                certificate={certificate}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}