
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  secondaryValue?: string;
  icon?: React.ReactNode;
  helpText?: string;
}

const StatCard = ({ title, value, change, secondaryValue, icon, helpText }: StatCardProps) => {
  const isPositive = change && change > 0;
  const displayChange = change ? Math.abs(change).toFixed(1) + "%" : null;

  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            {helpText && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3.5 w-3.5 text-muted-foreground/70 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px]">
                  <p className="text-xs">{helpText}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          {icon && <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">{icon}</div>}
        </div>
        
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-bold">{value}</h2>
            {displayChange && (
              <div className={`flex items-center text-xs font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? (
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-0.5" />
                )}
                {displayChange}
              </div>
            )}
          </div>
          
          {secondaryValue && (
            <p className="text-xs text-muted-foreground">{secondaryValue}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
