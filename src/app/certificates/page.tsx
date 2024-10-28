import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CertificateGrid } from "../components/certificate-grid";

export default function CertificatesPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Certificates</h1>
          <p className="text-muted-foreground">View and manage all your certificates in one place.</p>
        </div>
        <Button>Upload Certificate</Button>
      </div>
      
      <div className="grid gap-6">
        <Card className="p-6">
          <CertificateGrid />
        </Card>
      </div>
    </div>
  );
}