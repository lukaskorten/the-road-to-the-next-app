import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function TicketCreateForm() {
  return (
    <form action="" className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input id="text" name="title" type="text" />

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" />

      <Button type="submit">Create</Button>
    </form>
  );
}
