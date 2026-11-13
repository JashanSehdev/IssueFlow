"use client";
import ControlField from "@/components/form/controller-field/control-field";
import { Button, Grid, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { ProfileInput, ProfileOutput, profileSchema } from "./edit-profile.type";
import { zodResolver } from "@hookform/resolvers/zod";

interface EditProfileFormProp {
  defaultValues?: Partial<ProfileInput>;
  onSuccess: (data: ProfileOutput) => void;
}
export default function EditProfileForm({
  defaultValues,
  onSuccess
}: EditProfileFormProp) {
  const { control, handleSubmit } = useForm<
    ProfileInput,
    unknown,
    ProfileOutput
  >({
    defaultValues: defaultValues,
    resolver: zodResolver(profileSchema)
  });

  const onSubmit = (data: ProfileOutput) => {
    onSuccess(data)
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Stack spacing={2}>
              <ControlField
                name="first_name"
                label="First Name"
                placeholder="Joe"
                control={control}
              />

              <ControlField
                name="age"
                label="Age"
                placeholder="15"
                control={control}
              />
            </Stack>
          </Grid>

          <Grid size={6}>
            <Stack>
              <ControlField
                name="last_name"
                label="Last Name"
                placeholder="Doe"
                control={control}
              />
            </Stack>
          </Grid>
        </Grid>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" type="submit">Submit</Button>
          <Button variant="outlined">Cancel</Button>
        </Stack>
      </Stack>
    </form>
  );
}
