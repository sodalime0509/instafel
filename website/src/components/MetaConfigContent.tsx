import { Card, CardContent } from "./ui/card";
import { FlagCont } from "@/wdata/mconfig";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface MetaConfigContentProps {
  configData: FlagCont[];
}

export default function MetaConfigContent({
  configData,
}: MetaConfigContentProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Property name copied", {
      description: "Flag property name copied to clipboard",
      action: {
        label: "Okay",
        onClick: () => {},
      },
    });
  };

  return (
    <div>
      {configData.map((flag, idx) => (
        <Card
          key={idx}
          className={`text-foreground ${
            configData.length != idx + 1 ? "mb-4" : ""
          }`}
        >
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <span className="text-sm italic">{flag.name}</span>
              </div>
            </div>

            <div className="divide-y">
              {flag.properties.map((property, idx) => (
                <div key={idx} className="p-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex flex-col gap-1"
                      onClick={() => copyToClipboard(property.name)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">
                          {property.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0 hover:bg-muted"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <span className="text-xs text-foreground">
                          Copy to clipboard
                        </span>
                      </div>
                    </div>
                    {typeof property.value_bool === "boolean" ? (
                      <Switch
                        checked={property.value_bool}
                        onChange={() => {}}
                      />
                    ) : (
                      <span className="text-sm">{property.value_text}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
