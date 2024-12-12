import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from './input';

const FloatingInput = React.forwardRef((props, ref) => {
   const { className, ...rest } = props;
   return <Input className={cn('peer', className)} ref={ref} {...rest} />;
});
FloatingInput.displayName = 'FloatingInput';

const FloatingLabel = React.forwardRef((props, ref) => {
   const { className, ...rest } = props;
   return (
      <Label
         className={cn(
            '',
            className,
         )}
         ref={ref}
         {...rest}
      />
   );
});
FloatingLabel.displayName = 'FloatingLabel';

const CrmInput = React.forwardRef((props, ref) => {
   const { id, label, labelClassName, ...rest } = props;
   return (
      <div className="relative space-y-1.5">
         <FloatingLabel className={labelClassName} htmlFor={id}>{label}</FloatingLabel>
         <FloatingInput ref={ref} id={id} {...rest} />
      </div>
   );
});
CrmInput.displayName = 'CrmInput';

export { FloatingInput, FloatingLabel, CrmInput };
