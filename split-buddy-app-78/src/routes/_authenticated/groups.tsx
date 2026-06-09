import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
<<<<<<< HEAD
import { Plus, Users, Receipt } from "lucide-react";
=======
import {
  Plus,
  Users,
  ArrowRight,
  Sparkles,
  Wallet,
} from "lucide-react";
>>>>>>> 93739b50d8779562e8ca509d88feb8d556ea184f
import { useState } from "react";
import { toast } from "sonner";

import { api, type GroupSummary } from "@/lib/api";
<<<<<<< HEAD
import { AppShell, formatMoney } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
=======
import { AppShell } from "@/components/app-shell";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

>>>>>>> 93739b50d8779562e8ca509d88feb8d556ea184f
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { EmptyState } from "./dashboard";

export const Route =
  createFileRoute(
    "/_authenticated/groups"
  )({
    component:
      GroupsPage,
  });

function GroupsPage() {
  const qc =
    useQueryClient();

  const q = useQuery({
    queryKey: [
      "groups",
    ],
    queryFn:
      api.myGroups,
  });

  const [open, setOpen] =
    useState(false);

  const [name, setName] =
    useState("");

  const create =
    useMutation({
      mutationFn: (
        group_name: string
      ) =>
        api.createGroup(
          group_name
        ),

      onSuccess: () => {
        toast.success(
          "Group created 🎉"
        );

        qc.invalidateQueries({
          queryKey: [
            "groups",
          ],
        });

        setOpen(false);
        setName("");
      },

      onError: (
        e: Error
      ) =>
        toast.error(
          e.message
        ),
    });

  const list: GroupSummary[] =
    Array.isArray(
      q.data
    )
      ? q.data
      : (
          (q.data as Record<
            string,
            unknown
          > | undefined)?.[
            "groups"
          ] as GroupSummary[]
        ) ?? [];

  return (
    <AppShell
      title="Groups"
      action={
        <Dialog
          open={open}
          onOpenChange={
            setOpen
          }
        >
          <DialogTrigger
            asChild
          >
            <Button className="rounded-2xl gap-2 shadow-sm">
              <Plus className="h-4 w-4" />
              New Group
            </Button>
          </DialogTrigger>

          <DialogContent className="rounded-[2rem]">
            <DialogHeader>
              <DialogTitle>
                Create a Group
              </DialogTitle>
            </DialogHeader>

            <form
              onSubmit={(
                e
              ) => {
                e.preventDefault();

                if (
                  name.trim()
                ) {
                  create.mutate(
                    name.trim()
                  );
                }
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="gname">
                  Group name
                </Label>

                <Input
                  id="gname"
                  value={name}
                  onChange={(
                    e
                  ) =>
                    setName(
                      e.target
                        .value
                    )
                  }
                  placeholder="Goa Trip"
                  className="rounded-xl"
                  required
                />
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  className="rounded-xl"
                  disabled={
                    create.isPending
                  }
                >
                  {create.isPending
                    ? "Creating..."
                    : "Create Group"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      }
    >
      {/* HERO */}
      {!q.isLoading &&
        list.length >
          0 && (
          <div className="rounded-[2rem] overflow-hidden border bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-5 w-5 text-primary" />

                  <p className="text-sm text-primary font-medium">
                    Group Overview
                  </p>
                </div>

                <h1 className="text-4xl font-bold">
                  {
                    list.length
                  }{" "}
                  Groups
                </h1>

                <p className="text-muted-foreground mt-2 text-lg">
                  Manage
                  trips,
                  expenses &
                  shared
                  memories
                  💸
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <MiniStat
                  icon={
                    <Users className="h-5 w-5" />
                  }
                  label="Total Groups"
                  value={String(
                    list.length
                  )}
                />

                <MiniStat
                  icon={
                    <Wallet className="h-5 w-5" />
                  }
                  label="Latest"
                  value={
                    list[0]
                      ?.group_name ??
                    "-"
                  }
                />
              </div>
            </div>
          </div>
        )}

      {q.isLoading ? (
<<<<<<< HEAD
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-40" />)}
=======
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ...Array(6),
          ].map(
            (_, i) => (
              <Skeleton
                key={i}
                className="h-56 rounded-[2rem]"
              />
            )
          )}
>>>>>>> 93739b50d8779562e8ca509d88feb8d556ea184f
        </div>
      ) : list.length ===
        0 ? (
        <EmptyState
          icon={
            <Users className="h-7 w-7" />
          }
          title="No groups yet"
          desc="Create your first group and start splitting expenses."
          action={
            <Button
              onClick={() =>
                setOpen(
                  true
                )
              }
              className="gap-2 rounded-xl"
            >
              <Plus className="h-4 w-4" />
              Create Group
            </Button>
          }
        />
      ) : (
<<<<<<< HEAD
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((g) => (
            <GroupCard key={g.id} groupId={g.id} groupName={g.group_name} />
          ))}
=======
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map(
            (g) => (
              <Link
                key={g.id}
                to="/groups/$groupId"
                params={{
                  groupId:
                    g.id,
                }}
              >
                <Card className="group rounded-[2rem] overflow-hidden border hover:border-primary/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="h-16 w-16 rounded-[1.5rem] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary text-2xl font-bold shadow-sm">
                          {g.group_name?.[0]?.toUpperCase() ??
                            "G"}
                        </div>

                        <Sparkles className="h-5 w-5 text-muted-foreground group-hover:text-primary transition" />
                      </div>

                      <div className="mt-5">
                        <h3 className="font-bold text-xl truncate">
                          {
                            g.group_name
                          }
                        </h3>

                        <p className="text-sm text-muted-foreground mt-2">
                          Split
                          expenses
                          with
                          friends
                        </p>

                        <div className="mt-4 inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
                          Active
                          Group
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t pt-5 mt-6">
                      <span className="text-sm font-medium text-primary">
                        View
                        Details
                      </span>

                      <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          )}
>>>>>>> 93739b50d8779562e8ca509d88feb8d556ea184f
        </div>
      )}
    </AppShell>
  );
}

<<<<<<< HEAD
function GroupCard({ groupId, groupName }: { groupId: string; groupName: string }) {
  const summary = useQuery({
    queryKey: ["group", groupId, "summary"],
    queryFn: () => api.groupSummary(groupId),
  });

  const summaryData = (summary.data ?? {}) as Record<string, unknown>;
  const totalExpenses = (summaryData.total_expenses as number) ?? 0;
  const memberCount = (summaryData.total_members as number) ?? 0;

  return (
    <Link to="/groups/$groupId" params={{ groupId }}>
      <Card className="hover:border-primary/50 transition-colors h-full hover:shadow-md">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary/15 text-primary grid place-items-center font-bold text-lg shrink-0">
              {groupName?.[0]?.toUpperCase() ?? "G"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold truncate">{groupName}</p>
              <p className="text-xs text-muted-foreground mt-1">Tap to view details</p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm border-t pt-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <Users className="h-3.5 w-3.5" /> Members
              </span>
              <span className="font-medium">
                {summary.isLoading ? <Skeleton className="h-4 w-8" /> : memberCount}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <Receipt className="h-3.5 w-3.5" /> Expenses
              </span>
              <span className="font-medium">
                {summary.isLoading ? (
                  <Skeleton className="h-4 w-12" />
                ) : (
                  totalExpenses
                )}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
=======
function MiniStat({
  icon,
  label,
  value,
}: any) {
  return (
    <div className="rounded-3xl bg-background/80 backdrop-blur-md border p-4 min-w-[160px]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {label}
        </p>

        <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </div>
      </div>

      <h3 className="font-bold text-xl mt-3 truncate">
        {value}
      </h3>
    </div>
  );
}
>>>>>>> 93739b50d8779562e8ca509d88feb8d556ea184f
