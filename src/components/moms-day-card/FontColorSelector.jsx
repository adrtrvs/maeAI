
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Palette } from 'lucide-react';

export const FontColorSelector = ({ selectedFontColor, setSelectedFontColor, fontColorOptions }) => {
  return (
    <div>
      <Label htmlFor="font-color-select" className="text-md sm:text-lg font-medium text-pink-600 flex items-center">
        <Palette size={20} className="mr-2 text-pink-500" />
        Cor da Fonte:
      </Label>
      <Select value={selectedFontColor} onValueChange={setSelectedFontColor}>
        <SelectTrigger id="font-color-select" className="w-full mt-2 border-pink-300 focus:border-pink-500 focus:ring-pink-500">
          <SelectValue placeholder="Selecione uma cor" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Cores Disponíveis</SelectLabel>
            {fontColorOptions.map(color => (
              <SelectItem key={color.value} value={color.value}>
                <div className="flex items-center">
                  <span className={`w-4 h-4 rounded-full mr-2 ${color.className}`}></span>
                  {color.label}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
  