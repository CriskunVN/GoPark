"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { CheckCircle } from "lucide-react";

export default function Home() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: new FormData(form),
    })
      .then((res) => {
        if (res.ok) {
          setOpen(true);
          form.reset(); // reset form sau khi gửi
        } else {
          alert("Failed to send message.");
        }
      })
      .catch(() => alert("Something went wrong."));
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />

      <main className="flex-grow max-w-3xl mx-auto px-4 py-12 space-y-8">
        <h1 className="text-3xl font-bold text-center">Help & Support</h1>
        <p className="text-center text-muted-foreground">
          Find answers to your questions or get in touch with us.
        </p>

        {/* FAQ Section */}
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="q1">
            <AccordionTrigger>How do I book a parking spot?</AccordionTrigger>
            <AccordionContent>
              Go to the homepage, choose your vehicle type, city, district,
              date, and time, then click "Find Parking". You can then proceed to
              reserve.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>
              Can I cancel or modify a reservation?
            </AccordionTrigger>
            <AccordionContent>
              At this time, modifications are not supported. You may cancel via
              your account dashboard before your reserved time.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>
              Is there a mobile app available?
            </AccordionTrigger>
            <AccordionContent>
              Our mobile app is under development. Stay tuned!
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Contact Section */}
        <div className="mt-12 border-t pt-6 max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Contact Us
          </h2>
          <p className="text-center text-muted-foreground mb-6">
            Have questions or feedback? Send us a message.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="hidden"
              name="access_key"
              value="b19fe6de-12a8-4d61-b749-e617b5b2b5cd"
            />

            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your full name"
                className="bg-gray-100"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                className="bg-gray-100"
                required
              />
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Type your message here..."
                className="bg-gray-100"
                rows={4}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-900"
            >
              Send Message
            </Button>
          </form>
        </div>
      </main>

      <Footer />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <CheckCircle className="text-green-600 w-12 h-12 mx-auto mb-2" />
            <DialogTitle className="text-xl font-bold">
              Message Sent!
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              We've received your message. We'll be in touch soon.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="mx-auto mt-4"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
