import { createFileRoute } from "@tanstack/react-router";
<<<<<<< HEAD
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, Check } from "lucide-react";
import { toast } from "sonner";
import { api, type Notification } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
=======
import { useQuery } from "@tanstack/react-query";
import {
  Bell,
  Sparkles,
  Activity,
  Clock3,
} from "lucide-react";

import { api } from "@/lib/api";

import {
  AppShell,
} from "@/components/app-shell";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
>>>>>>> 93739b50d8779562e8ca509d88feb8d556ea184f
import { EmptyState } from "./dashboard";

export const Route =
  createFileRoute(
    "/_authenticated/notifications"
  )({
    component:
      NotificationsPage,
  });

function NotificationsPage() {
<<<<<<< HEAD
  const qc = useQueryClient();
  const { user } = useAuth();
  const q = useQuery({ queryKey: ["notifications"], queryFn: api.notifications });
  
  const markAsRead = useMutation({
    mutationFn: (id: string) => api.markNotificationAsRead(id),
    onSuccess: () => {
      toast.success("Marked as read");
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const list = Array.isArray(q.data) ? q.data : [];
  const unreadCount = list.filter((n) => !((n as Notification).is_read ?? false)).length;

  return (
    <AppShell
      title={`Notifications${unreadCount > 0 ? ` (${unreadCount})` : ""}`}
      action={unreadCount > 0 ? (
        <Button
          variant="outline"
          size="sm"
          onClick={() => list.forEach((n) => {
            if (!((n as Notification).is_read ?? false)) {
              markAsRead.mutate((n as Notification).id);
            }
          })}
          disabled={markAsRead.isPending}
        >
          Mark all as read
        </Button>
      ) : null}
    >
      <Card>
        <CardHeader><CardTitle>Recent activity</CardTitle></CardHeader>
        <CardContent>
          {q.isLoading ? (
            <Skeleton className="h-24" />
          ) : list.length === 0 ? (
            <EmptyState
              icon={<Bell className="h-6 w-6" />}
              title="You're all caught up"
              desc="Notifications will appear here."
            />
          ) : (
            <ul className="divide-y">
              {list.map((n) => {
                const item = n as Notification;
                const message = item.message ?? item.text ?? JSON.stringify(item);
                const created = item.created_at ?? "";
                const isRead = item.is_read ?? false;
                
                return (
                  <li
                    key={item.id}
                    className={`py-3 px-3 rounded-md flex items-start justify-between gap-3 ${
                      isRead ? "bg-muted/30" : "bg-primary/5"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${isRead ? "text-muted-foreground" : ""}`}>
                        {message}
                      </p>
                      {created && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {new Date(created).toLocaleString()}
                        </p>
                      )}
                    </div>
                    {!isRead && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => markAsRead.mutate(item.id)}
                        disabled={markAsRead.isPending}
                        className="shrink-0"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
=======
 const q =
  useQuery({
    queryKey: [
      "notifications",
    ],

    queryFn:
      api.notifications,

    staleTime: 0,
    gcTime: 0,

    refetchOnMount:
      "always",

    refetchOnWindowFocus:
      true,

    refetchOnReconnect:
      true,

    refetchInterval:
      3000, // refresh every 3 sec
  });

  const list =
    Array.isArray(
      q.data
    )
      ? q.data
      : [];

  const todayCount =
    list.filter(
      (n) => {
        const item =
          n as Record<
            string,
            unknown
          >;

        const created =
          item.created_at as
            | string
            | undefined;

        if (
          !created
        )
          return false;

        const date =
          new Date(
            created
          );

        const now =
          new Date();

        return (
          date.toDateString() ===
          now.toDateString()
        );
      }
    ).length;

  return (
    <AppShell
      title="Notifications"
    >
      <div className="space-y-6">

        {/* HERO */}
        <div className="rounded-[2rem] overflow-hidden border bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-primary" />

                <p className="text-sm text-primary font-medium">
                  Activity Center
                </p>
              </div>

              <h1 className="text-4xl font-bold tracking-tight">
                {
                  list.length
                }
              </h1>

              <p className="text-muted-foreground mt-2 text-lg">
                Stay updated with expenses,
                payments, and group activity 🔔
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <StatCard
                label="Total"
                value={`${list.length}`}
                icon={
                  <Bell className="h-5 w-5" />
                }
              />

              <StatCard
                label="Today"
                value={`${todayCount}`}
                icon={
                  <Clock3 className="h-5 w-5" />
                }
              />
            </div>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <Card className="rounded-[2rem] border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>

              <Badge
                variant="outline"
                className="rounded-full"
              >
                {
                  list.length
                }{" "}
                total
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            {q.isLoading ? (
              <div className="space-y-4">
                {[
                  1, 2, 3,
                ].map(
                  (
                    i
                  ) => (
                    <Skeleton
                      key={
                        i
                      }
                      className="h-24 rounded-[2rem]"
                    />
                  )
                )}
              </div>
            ) : list.length ===
              0 ? (
              <EmptyState
                icon={
                  <Bell className="h-6 w-6" />
                }
                title="You're all caught up 🎉"
                desc="Notifications will appear here."
              />
            ) : (
              <div className="space-y-4">
                {list.map(
                  (
                    n,
                    i
                  ) => {
                    const item =
                      n as Record<
                        string,
                        unknown
                      >;

                    const message =
                      (
                        item.message as string
                      ) ??
                      (
                        item.text as string
                      ) ??
                      JSON.stringify(
                        item
                      );

                    const created =
                      (
                        item.created_at as string
                      ) ??
                      "";

                    return (
                      <Card
                        key={
                          i
                        }
                        className="rounded-[2rem] border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                      >
                        <CardContent className="p-5 flex items-start justify-between gap-4">

                          <div className="flex items-start gap-4 flex-1">

                            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                              <Bell className="h-5 w-5" />
                            </div>

                            <div className="min-w-0">
                              <p className="font-medium leading-relaxed">
                                {
                                  message
                                }
                              </p>

                              {created && (
                                <p className="text-xs text-muted-foreground mt-2">
                                  {new Date(
                                    created
                                  ).toLocaleDateString()}{" "}
                                  •{" "}
                                  {new Date(
                                    created
                                  ).toLocaleTimeString()}
                                </p>
                              )}
                            </div>
                          </div>

                          <Badge className="rounded-full shrink-0">
                            New
                          </Badge>
                        </CardContent>
                      </Card>
                    );
                  }
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
>>>>>>> 93739b50d8779562e8ca509d88feb8d556ea184f
    </AppShell>
  );
}

function StatCard({
  label,
  value,
  icon,
}: any) {
  return (
    <div className="rounded-3xl bg-background/80 backdrop-blur-md border p-4 min-w-[170px]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {label}
        </p>

        <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </div>
      </div>

      <h3 className="font-bold text-2xl mt-3">
        {value}
      </h3>
    </div>
  );
}