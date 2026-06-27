import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import Button from '../ui/Button';

const AddressForm = ({ onSubmit, initialData, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {
      fullName: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      phone: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name *"
          {...register('fullName', { required: 'Full name is required' })}
          error={errors.fullName?.message}
          placeholder="John Doe"
        />
        <Input
          label="Phone *"
          {...register('phone', { required: 'Phone is required' })}
          error={errors.phone?.message}
          placeholder="+1 234 567 8900"
        />
      </div>

      <Input
        label="Street Address *"
        {...register('street', { required: 'Street address is required' })}
        error={errors.street?.message}
        placeholder="123 Main Street"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="City *"
          {...register('city', { required: 'City is required' })}
          error={errors.city?.message}
          placeholder="New York"
        />
        <Input
          label="State *"
          {...register('state', { required: 'State is required' })}
          error={errors.state?.message}
          placeholder="NY"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="ZIP Code *"
          {...register('zipCode', { required: 'ZIP code is required' })}
          error={errors.zipCode?.message}
          placeholder="10001"
        />
        <Input
          label="Country *"
          {...register('country', { required: 'Country is required' })}
          error={errors.country?.message}
          placeholder="United States"
        />
      </div>

      <Button
        type="submit"
        loading={isLoading}
        className="w-full"
      >
        Save Address
      </Button>
    </form>
  );
};

export default AddressForm;