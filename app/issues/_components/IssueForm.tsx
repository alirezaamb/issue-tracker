'use client';
import { ErrorMessage } from '@/app/components/index';
import { createIssueSchema } from '@/app/ValidationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Box, Button, Callout, Spinner, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

type IssueFormData = z.infer<typeof createIssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  console.log(issue);
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmmiting, setIsSubmmiting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = () => {
    handleSubmit(async (data) => {
      try {
        setIsSubmmiting(true);
        await axios.post('/api/issues', data);
        router.push('/issues');
      } catch (error) {
        setIsSubmmiting(false);

        setError('an unexpected error occured');
      }
    });
  };
  return (
    <Box className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5" color="red">
          {error}
        </Callout.Root>
      )}
      <form className=" space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          placeholder="Title"
          {...register('title')}
          defaultValue={issue?.title}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button type="submit" disabled={isSubmmiting}>
          Submit new Issue {isSubmmiting && <Spinner />}
        </Button>
      </form>
    </Box>
  );
};

export default IssueForm;
