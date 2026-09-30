import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Check, Globe2, Package, Smartphone, TrendingUp, Wallet, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "JaDigital — Soluções para pequenos negócios" }, { name: "description", content: "Soluções digitais personalizadas para bombonieres, depósitos e pequenos comércios." }] }),
