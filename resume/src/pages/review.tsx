import FeedbackForm from "@/components/feedback-form";
import Flags from "@/components/flags";
import PDF from "@/components/pdf";
import Score from "@/components/score";
import Skeleton from "@/components/skeleton";
import { useFormState } from "@/hooks/form-context";
import type { FormState } from "@/types";
import { sendGAEvent } from "@next/third-parties/google";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Review() {
  const router = useRouter();
  const [formState] = useFormState();
  const [isFeedbackFormOpen, setFeedbackFormOpen] = useState(false);

  const mutation = useMutation<
    FormState,
    Error,
    | { url: string; formData?: undefined }
    | { formData: FormData; url?: undefined }
  >({
    mutationKey: ["resume-check"],
    mutationFn: async ({ url, formData }) => {
      let res;

      if (formData) {
        res = await fetch("/api/grade", {
          method: "POST",
          body: formData,
        });
      } else {
        res = await fetch("/api/grade?url=" + url, {
          method: "GET",
        });
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(
          "error" in err ? err.error : "An unexpected error occurred",
        );
      }

      return res.json();
    },
    onMutate: () => {
      sendGAEvent("event", "resume-checker-submission");
    },
    onSuccess: (data) => {
      sendGAEvent("event", "resume-checker-success", data);
    },
    onError: (e) => {
      sendGAEvent("event", "resume-checker-error", e);
      router.push("/");
    },
  });

  useEffect(() => {
    if (formState.url) {
      mutation.mutate({ url: formState.url });
    } else if (formState.formData) {
      mutation.mutate({ formData: formState.formData });
    } else {
      router.push("/");
    }
    /* eslint-disable-next-line */
  }, [formState.formData, formState.url]);

  const isVictorVigon = formState.url === "public/s_resume.pdf";

  return (
    <>
      <div className="mt-6 animate-fly-in container mx-auto px-4 grid lg:grid-cols-2 gap-6">
        <PDF />
        <div>
          <h2 className="text-2xl mb-4">Your CV Score</h2>
          <div className="mb-8">
            <Score letter={mutation?.data?.grade} />
          </div>
          <div className="mb-8">
            {mutation.isPending ? <Skeleton /> : null}
            {mutation.data && mutation.data?.red_flags.length > 0 ? (
              <Flags
                flags={mutation.data.red_flags}
                color="red"
                label={`Red flag${mutation.data.red_flags.length > 1 ? "s" : ""}`}
              />
            ) : null}
            {mutation.data && mutation.data?.yellow_flags.length > 0 ? (
              <Flags
                flags={mutation.data.yellow_flags}
                color="yellow"
                label={`Yellow flag${mutation.data.yellow_flags.length > 1 ? "s" : ""}`}
              />
            ) : null}
          </div>

          {mutation.isPending ? (
            <p className="opacity-0 animate-[fadeIn_200ms_ease-in_3s_forwards] px-4 py-2 text-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-semibold rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
              <span className="mr-2 text-blue-500 dark:text-blue-400">●</span>
              The process may take up to 2 minutes...
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="px-10 py-2 text-center block rounded-lg bg-indigo-800 font-bold hover:bg-indigo-600 cursor-pointer text-white"
              >
                Try again
              </Link>
              <button onClick={() => setFeedbackFormOpen(true)}>
                Did we get something wrong?{" "}
                <span className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200 cursor-pointer">
                  Let us know...
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
      {mutation.isSuccess ? (
        <FeedbackForm
          data={mutation.data}
          setFeedbackFormOpen={setFeedbackFormOpen}
          isFeedbackFormOpen={isFeedbackFormOpen}
        />
      ) : null}
    </>
  );
}