---
id: 1
status: "published" # Seçenekler: "published" | "coming_soon"
date: "2024"
title: "Aesop Signature"
slug: "aesop-signature"
slogan: "Nature meets Digital Harmony."
location: "Florence / Italy"
theme_color: "#d8d4cf" # Proje detayına girince arka plan bu renk olabilir

# Kartlarda görünecek kısa açıklama (SEO description için de bunu kullanacağız)
short_description: "A minimalist e-commerce experience redefining digital luxury through sensory design."

# Kategori ve Filtreleme
services:
  - "Web Design"
  - "Development"
  - "Art Direction"

# Canlı Proje Linki (Boş bırakırsan buton çıkmaz)
live_url: "https://aesop.com"

# Kapak Medyası (Proje Kartı için)
cover:
  image: "/images/works/aesop/cover.jpg" # Mobil ve Fallback
  video: "https://player.vimeo.com/external/12345.hd.mp4?s=..." # Hover videosu (URL veya local path)

# Proje İçi Galeri (Sınırsız ekleme yapabilirsin)
gallery:
  - type: "image"
    src: "/images/works/aesop/detail-1.webp"
    alt: "Homepage Hero Section"

  - type: "video"
    src: "https://cdn.example.com/videos/aesop-interaction.webm" # Webm, mp4 url fark etmez
    autoplay: true
    loop: true

  - type: "image"
    src: "/images/works/aesop/detail-2.avif" # Avif formatı örneği

  - type: "image"
    src: "/images/works/aesop/detail-3.jpg"

# Müşteri Yorumu (Araya Sıkıştırma)
testimonial:
  author: "Elena Rossi"
  quote: "The attention to detail in animations and typography elevated our brand perception significantly."
  insert_after: 2 # Galeri listesindeki 2. elemandan sonra gösterilecek
---

## Overview

Aesop has always been known for its meticulous attention to detail and unique sensory experiences in their physical stores. Our challenge was to translate this tactile and olfactory experience into a digital medium.

By utilizing WebGL interactions and a fluid navigation structure, we created a website that feels as organic as the products themselves. The design philosophy centers on "less is more," allowing the product photography and typography to breathe.

## Tech Stack

We used Nuxt 3 for the frontend, combined with GSAP for high-performance animations. The backend is powered by a headless CMS to allow easy content updates by the client team.
