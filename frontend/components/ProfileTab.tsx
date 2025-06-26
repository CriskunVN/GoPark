import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
        <CardDescription>View and update your personal information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/avatar.png" alt="User avatar" />
            <AvatarFallback>UO</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">Nguyen Owner</h2>
            <p className="text-sm text-gray-500">owner@gopark.vn</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" value="Nguyen Owner" readOnly />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" value="owner@gopark.vn" readOnly />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value="+84 912 345 678" readOnly />
          </div>

          <div>
            <Label htmlFor="joined">Joined</Label>
            <Input id="joined" value="Jan 10, 2024" readOnly />
          </div>
        </div>

        <div className="pt-4">
          <Button>Update Info</Button>
        </div>
      </CardContent>
    </Card>
  );
}