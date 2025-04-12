
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { TemplateType } from "@/components/dashboard/TemplateSummary";
import { PackingListItemProps } from "@/components/dashboard/PackingListCard";

// Template data - this would typically come from an API
const templateDetails: Record<string, {title: string, date: string, description: string}> = {
  't1': {
    title: 'Weekend Getaway',
    date: 'This Weekend',
    description: 'Everything you need for a quick weekend trip.'
  },
  't2': {
    title: 'Hackathon',
    date: 'Next Event',
    description: 'All the tech gear and essentials for a productive hackathon.'
  },
  't3': {
    title: 'Camping Trip',
    date: 'Upcoming',
    description: 'Complete packing list for an outdoor camping adventure.'
  },
  't4': {
    title: 'Beach Day',
    date: 'Summer',
    description: 'Everything you need for a fun day at the beach.'
  },
  'custom': {
    title: '',
    date: '',
    description: ''
  }
};

interface CreateListModalProps {
  open: boolean;
  onClose: () => void;
  templates: TemplateType[];
  onCreateList?: (newList: PackingListItemProps) => void;
}

export const CreateListModal = ({
  open,
  onClose,
  templates,
  onCreateList
}: CreateListModalProps) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const { toast } = useToast();

  // Apply template values when a template is selected
  useEffect(() => {
    if (selectedTemplate && selectedTemplate !== "custom") {
      const template = templateDetails[selectedTemplate];
      if (template) {
        setTitle(template.title);
        setDate(template.date);
        setDescription(template.description);
      }
    } else if (selectedTemplate === "custom") {
      // Clear the form for custom template
      setTitle("");
      setDate("");
      setDescription("");
    }
  }, [selectedTemplate]);

  const handleCreateList = () => {
    if (!title) {
      toast({
        title: "Error",
        description: "Please provide a title for the list.",
        variant: "destructive",
      });
      return;
    }

    const templateName = selectedTemplate 
      ? templates.find(t => t.id === selectedTemplate)?.name || "custom"
      : "custom";

    // Create a new packing list object
    const newList: PackingListItemProps = {
      id: `list-${Date.now()}`, // Generate a unique ID
      title: title,
      totalItems: 0,
      packedItems: 0,
      members: 0,
      date: date || 'No date specified',
      status: 'not-started'
    };

    // Call the onCreateList callback to add this to the dashboard
    if (onCreateList) {
      onCreateList(newList);
    }

    // In a real app, this would make an API call to create a new list
    toast({
      title: "List Created",
      description: `"${title}" has been created successfully using ${templateName} template.`,
    });
    
    // Reset form and close modal
    setTitle("");
    setDate("");
    setDescription("");
    setSelectedTemplate(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Packing List</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new packing list.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">List Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Summer Camping Trip"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date / Time Period</Label>
              <Input
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g., August 15-20, 2023"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add any details about your packing list..."
                rows={2}
              />
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Choose a Template</h3>
            
            <RadioGroup
              value={selectedTemplate || ""}
              onValueChange={setSelectedTemplate}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {templates.map((template) => (
                <div key={template.id} className="relative">
                  <RadioGroupItem
                    value={template.id}
                    id={`template-${template.id}`}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={`template-${template.id}`}
                    className="cursor-pointer block"
                  >
                    <Card className={`
                      overflow-hidden transition-all
                      ${selectedTemplate === template.id ? 'ring-2 ring-primary' : ''}
                    `}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-2xl">{template.icon}</span>
                          <span className="text-xs text-muted-foreground">
                            {template.categories} categories • {template.items} items
                          </span>
                        </div>
                        <h3 className="font-medium">{template.name}</h3>
                      </CardContent>
                    </Card>
                  </Label>
                </div>
              ))}
              
              <div className="relative">
                <RadioGroupItem
                  value="custom"
                  id="template-custom"
                  className="sr-only"
                />
                <Label
                  htmlFor="template-custom"
                  className="cursor-pointer block"
                >
                  <Card className={`
                    overflow-hidden border-dashed transition-all
                    ${selectedTemplate === "custom" ? 'ring-2 ring-primary' : ''}
                  `}>
                    <CardContent className="p-4 flex items-center justify-center h-full">
                      <div className="text-center">
                        <span className="block text-2xl mb-1">✨</span>
                        <h3 className="font-medium">Start from Scratch</h3>
                        <p className="text-xs text-muted-foreground mt-1">Create a custom list</p>
                      </div>
                    </CardContent>
                  </Card>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCreateList}>Create List</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
