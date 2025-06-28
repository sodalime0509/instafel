"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Plus, Settings, Eye } from "lucide-react";
import { FlagCont, FlagContProperty } from "@/wdata/mconfig";
import MetaConfigContent from "./MetaConfigContent";

interface DataEditorProps {
  initialFlags?: FlagCont[];
  onFlagsChange?: (flags: FlagCont[]) => void;
  className?: string;
}

export function FlagDataEditor({
  initialFlags,
  onFlagsChange,
  className = "",
}: DataEditorProps) {
  const [flags, setFlags] = useState<FlagCont[]>(initialFlags);

  const updateFlags = (newFlags: FlagCont[]) => {
    setFlags(newFlags);
    onFlagsChange?.(newFlags);
  };

  const addFlag = () => {
    const newFlags = [...flags, { name: "", properties: [] }];
    updateFlags(newFlags);
  };

  const updateFlagName = (flagIndex: number, name: string) => {
    const newFlags = flags.map((flag, index) =>
      index === flagIndex ? { ...flag, name } : flag
    );
    updateFlags(newFlags);
  };

  const deleteFlag = (flagIndex: number) => {
    const newFlags = flags.filter((_, index) => index !== flagIndex);
    updateFlags(newFlags);
  };

  const addProperty = (flagIndex: number) => {
    const newFlags = flags.map((flag, index) =>
      index === flagIndex
        ? {
            ...flag,
            properties: [...flag.properties, { name: "", value_bool: false }],
          }
        : flag
    );
    updateFlags(newFlags);
  };

  const updateProperty = (
    flagIndex: number,
    propertyIndex: number,
    updates: Partial<FlagContProperty>
  ) => {
    const newFlags = flags.map((flag, fIndex) =>
      fIndex === flagIndex
        ? {
            ...flag,
            properties: flag.properties.map((prop, pIndex) =>
              pIndex === propertyIndex ? { ...prop, ...updates } : prop
            ),
          }
        : flag
    );
    updateFlags(newFlags);
  };

  const deleteProperty = (flagIndex: number, propertyIndex: number) => {
    const newFlags = flags.map((flag, fIndex) =>
      fIndex === flagIndex
        ? {
            ...flag,
            properties: flag.properties.filter(
              (_, pIndex) => pIndex !== propertyIndex
            ),
          }
        : flag
    );
    updateFlags(newFlags);
  };

  const changePropertyType = (
    flagIndex: number,
    propertyIndex: number,
    type: "bool" | "text"
  ) => {
    const updates: Partial<FlagContProperty> =
      type === "bool"
        ? { value_bool: false, value_text: undefined }
        : { value_text: "", value_bool: undefined };

    updateProperty(flagIndex, propertyIndex, updates);
  };

  return (
    <div className={`container mx-auto ${className}`}>
      <div className="space-y-6">
        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-6">
            <ScrollArea className="w-full">
              <div className="space-y-4 ">
                {flags.map((flag, flagIndex) => (
                  <Card
                    key={flagIndex}
                    className="border-1 hover:border-primary/20 transition-colors"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CardTitle className="text-lg">
                            #{flagIndex + 1} Flag
                          </CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {flag.properties.length} properties
                          </Badge>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteFlag(flagIndex)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor={`flag-name-${flagIndex}`}
                          className="text-sm font-medium"
                        >
                          Flag Name
                        </Label>
                        <Input
                          id={`flag-name-${flagIndex}`}
                          value={flag.name}
                          onChange={(e) =>
                            updateFlagName(flagIndex, e.target.value)
                          }
                          placeholder="Enter flag name..."
                          className="font-mono"
                        />
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <Label className="text-sm font-medium">
                            Sub-flags (Properties)
                          </Label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addProperty(flagIndex)}
                            className="h-8"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add Property
                          </Button>
                        </div>

                        {flag.properties.length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground">
                            <p className="text-sm">No properties yet</p>
                            <p className="text-xs">
                              Click "Add Property" to get started
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {flag.properties.map((property, propertyIndex) => (
                              <Card key={propertyIndex} className="bg-muted/30">
                                <CardContent className="p-4">
                                  <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        Property {propertyIndex + 1}
                                      </Badge>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          deleteProperty(
                                            flagIndex,
                                            propertyIndex
                                          )
                                        }
                                        className="h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </div>

                                    <div className="space-y-2">
                                      <Label
                                        htmlFor={`prop-name-${flagIndex}-${propertyIndex}`}
                                        className="text-xs"
                                      >
                                        Property Name
                                      </Label>
                                      <Input
                                        id={`prop-name-${flagIndex}-${propertyIndex}`}
                                        value={property.name}
                                        onChange={(e) =>
                                          updateProperty(
                                            flagIndex,
                                            propertyIndex,
                                            { name: e.target.value }
                                          )
                                        }
                                        placeholder="Property name..."
                                        className="h-8 text-sm font-mono"
                                      />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                      <div className="space-y-2">
                                        <Label className="text-xs">Type</Label>
                                        <Select
                                          value={
                                            property.value_bool !== undefined
                                              ? "bool"
                                              : "text"
                                          }
                                          onValueChange={(
                                            value: "bool" | "text"
                                          ) =>
                                            changePropertyType(
                                              flagIndex,
                                              propertyIndex,
                                              value
                                            )
                                          }
                                        >
                                          <SelectTrigger className="h-8">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="bool">
                                              Boolean
                                            </SelectItem>
                                            <SelectItem value="text">
                                              Text
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>

                                      <div className="space-y-2">
                                        <Label className="text-xs">Value</Label>
                                        {property.value_bool !== undefined ? (
                                          <div className="flex items-center space-x-2 h-8">
                                            <Switch
                                              checked={property.value_bool}
                                              onCheckedChange={(checked) =>
                                                updateProperty(
                                                  flagIndex,
                                                  propertyIndex,
                                                  { value_bool: checked }
                                                )
                                              }
                                              className="scale-75"
                                            />
                                            <Badge
                                              variant={
                                                property.value_bool
                                                  ? "default"
                                                  : "secondary"
                                              }
                                              className="text-xs"
                                            >
                                              {property.value_bool
                                                ? "true"
                                                : "false"}
                                            </Badge>
                                          </div>
                                        ) : (
                                          <Input
                                            value={property.value_text || ""}
                                            onChange={(e) =>
                                              updateProperty(
                                                flagIndex,
                                                propertyIndex,
                                                { value_text: e.target.value }
                                              )
                                            }
                                            placeholder="Enter value..."
                                            className="h-8 text-sm font-mono"
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {flags.length !== 0 && (
                  <Button
                    onClick={addFlag}
                    type="button"
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Flag
                  </Button>
                )}

                {flags.length === 0 && (
                  <Card className="border-dashed border-2">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="text-center space-y-2">
                        <h3 className="text-lg font-medium">
                          No any flag added
                        </h3>
                        <Button
                          type="button"
                          onClick={addFlag}
                          className="mt-4 w-full"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Flag
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <div>
              <div className="text-center space-y-2 w-full">
                <MetaConfigContent configData={flags} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export type { DataEditorProps };
