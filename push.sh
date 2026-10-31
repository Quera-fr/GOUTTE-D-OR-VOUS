#!/usr/bin/env bash
# Script pour publier automatiquement sur GitHub puis sur Heroku

set -e

# Message de commit par défaut ou passé en argument ($1)
COMMIT_MSG="${1:-Mise à jour et déploiement}"

echo "=========================================="
echo "🚀 Début du déploiement : GitHub & Heroku"
echo "=========================================="

# Vérifier s'il y a des modifications locales
if [[ -n $(git status --porcelain) ]]; then
  echo "📦 Changements détectés, création du commit..."
  git add .
  git commit -m "$COMMIT_MSG"
else
  echo "ℹ️  Aucune nouvelle modification locale à commiter."
fi

# 1. Push sur GitHub
echo ""
echo "📤 [1/2] Push vers GitHub (origin main)..."
git push origin main
echo "✅ Push GitHub réussi."

# 2. Push sur Heroku
echo ""
echo "📤 [2/2] Push vers Heroku (heroku main)..."
git push heroku main
echo "✅ Déploiement Heroku réussi !"

echo ""
echo "=========================================="
echo "🎉 Déploiement terminé avec succès !"
echo "🌐 Application Heroku : https://goutte-dor-et-vous-40e65ab81d58.herokuapp.com/"
echo "=========================================="
