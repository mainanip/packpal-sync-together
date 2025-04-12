
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Plus } from 'lucide-react';

// export type TemplateType = {
//   id: string;
//   name: string;
//   categories: number;
//   items: number;
//   icon: string;
// };

// interface TemplateSummaryProps {
//   templates: TemplateType[];
//   onUseTemplate: (templateId: string) => void;
// }

// export const TemplateSummary = ({ templates, onUseTemplate }: TemplateSummaryProps) => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//       {templates.map((template) => (
//         <Card key={template.id} className="overflow-hidden">
//           <CardContent className="p-4 flex flex-col h-full">
//             <div className="flex justify-between items-center mb-3">
//               <span className="text-2xl">{template.icon}</span>
//               <Button 
//                 variant="ghost" 
//                 size="sm" 
//                 className="text-xs"
//                 onClick={() => onUseTemplate(template.id)}
//               >
//                 <Plus className="h-3.5 w-3.5 mr-1" />
//                 Use
//               </Button>
//             </div>
//             <h3 className="font-medium mb-1">{template.name}</h3>
//             <p className="text-xs text-muted-foreground">
//               {template.categories} categories • {template.items} items
//             </p>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export type TemplateType = {
  id: string;
  name: string;
  categories: number;
  items: number;
  icon: string;
  createdBy?: string;
};

interface TemplateSummaryProps {
  templates: TemplateType[];
  onUseTemplate: (templateId: string) => void;
  onCreateTemplate?: () => void;
}

export const TemplateSummary = ({ 
  templates, 
  onUseTemplate,
  onCreateTemplate 
}: TemplateSummaryProps) => {
  const { user } = useAuth();

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden hover:shadow-md">
            <CardContent className="p-4 flex flex-col h-full">
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl">{template.icon}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => onUseTemplate(template.id)}
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Use
                </Button>
              </div>
              <h3 className="font-medium mb-1">{template.name}</h3>
              <p className="text-xs text-muted-foreground">
                {template.categories} categories • {template.items} items
              </p>
              {template.createdBy && (
                <p className="text-xs text-muted-foreground mt-2">
                  Created by: {template.createdBy}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};